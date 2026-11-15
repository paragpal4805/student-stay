<?php
require dirname(__DIR__) . '/app/bootstrap.php';
try {
    $action = $_GET['action'] ?? '';
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, ['GET','POST'], true)) respond(['error'=>'Method not allowed'],405);
    $data = [];
    if ($method === 'POST') {
        if (!hash_equals($_SESSION['csrf'], $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')) respond(['error'=>'Session expired. Refresh the page.'],403);
        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) respond(['error'=>'Invalid JSON'],400);
    }
    if ($action === 'session' && $method === 'GET') respond(['user'=>currentUser(),'csrf'=>$_SESSION['csrf']]);
    if ($action === 'signup' && $method === 'POST') {
        $name = trim((string)($data['name'] ?? ''));
        $email = strtolower(trim((string)($data['email'] ?? '')));
        $phone = trim((string)($data['phone'] ?? ''));
        $password = (string)($data['password'] ?? '');
        if ($name === '' || strlen($name)>100 || !filter_var($email,FILTER_VALIDATE_EMAIL) || strlen($email)>190 || !preg_match('/^[0-9+() .-]{7,25}$/',$phone) || strlen($password)<8 || strlen($password)>72) respond(['error'=>'Enter a name, valid email and phone, and a password of 8–72 bytes.'],422);
        try {
            $q=db()->prepare('INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)');
            $q->execute([$name,$email,password_hash($password,PASSWORD_DEFAULT),$phone]);
        } catch (PDOException $ex) {
            if ($ex->getCode()==='23000') respond(['error'=>'Email already registered.'],409);
            throw $ex;
        }
        session_regenerate_id(true);
        $_SESSION['uid']=(int)db()->lastInsertId();
        respond(['user'=>currentUser()],201);
    }
    if ($action === 'login' && $method === 'POST') {
        $q=db()->prepare('SELECT id,password FROM users WHERE email=?');
        $q->execute([strtolower(trim((string)($data['email'] ?? '')))]);
        $user=$q->fetch();
        if (!$user || !password_verify((string)($data['password'] ?? ''),$user['password'])) respond(['error'=>'Invalid email or password.'],401);
        session_regenerate_id(true);
        $_SESSION['uid']=(int)$user['id'];
        respond(['user'=>currentUser()]);
    }
    if ($action === 'logout' && $method === 'POST') {
        unset($_SESSION['uid']); session_regenerate_id(true);
        respond(['ok'=>true]);
    }
    if ($action === 'properties' && $method === 'GET') {
        $uid=(int)($_SESSION['uid'] ?? 0);
        $sql='SELECT p.*, (SELECT path FROM property_images WHERE property_id=p.id ORDER BY sort_order,id LIMIT 1) AS image, EXISTS(SELECT 1 FROM interested_users i WHERE i.property_id=p.id AND i.user_id=?) AS interested FROM properties p WHERE 1=1';
        $params=[$uid];
        $city=trim((string)($_GET['city'] ?? ''));
        $gender=(string)($_GET['gender'] ?? '');
        if ($city!=='') { $sql.=' AND p.city=?'; $params[]=$city; }
        if ($gender!=='') {
            if (!in_array($gender,['Male','Female','Unisex'],true)) respond(['error'=>'Invalid gender filter'],422);
            $sql.=' AND p.gender=?'; $params[]=$gender;
        }
        foreach (['min'=>' >= ', 'max'=>' <= '] as $key=>$op) {
            if (isset($_GET[$key]) && $_GET[$key]!=='') {
                $n=filter_var($_GET[$key],FILTER_VALIDATE_FLOAT);
                if ($n===false || $n<0 || $n>99999999) respond(['error'=>'Invalid budget'],422);
                $sql.=' AND p.price'.$op.'?'; $params[]=$n;
            }
        }
        if (($_GET['shortlist'] ?? '')==='1') {
            if (!$uid) respond(['error'=>'Log in to view your shortlist.'],401);
            $sql.=' AND EXISTS(SELECT 1 FROM interested_users s WHERE s.property_id=p.id AND s.user_id=?)'; $params[]=$uid;
        }
        $sql.=' ORDER BY p.price,p.id';
        $q=db()->prepare($sql); $q->execute($params);
        $cities=db()->query('SELECT DISTINCT city FROM properties ORDER BY city')->fetchAll(PDO::FETCH_COLUMN);
        respond(['properties'=>$q->fetchAll(),'cities'=>$cities]);
    }
    if ($action === 'interest' && $method === 'POST') {
        $uid=(int)($_SESSION['uid'] ?? 0);
        if (!$uid) respond(['error'=>'Please log in before shortlisting.'],401);
        $id=filter_var($data['property_id'] ?? null,FILTER_VALIDATE_INT);
        if (!$id || $id<1 || !isset($data['interested']) || !is_bool($data['interested'])) respond(['error'=>'Invalid property or interest state'],422);
        $q=db()->prepare('SELECT id FROM properties WHERE id=?'); $q->execute([$id]);
        if (!$q->fetch()) respond(['error'=>'Property not found'],404);
        if ($data['interested']) {
            $q=db()->prepare('INSERT INTO interested_users(user_id,property_id) VALUES(?,?) ON DUPLICATE KEY UPDATE user_id=VALUES(user_id)');
        } else { $q=db()->prepare('DELETE FROM interested_users WHERE user_id=? AND property_id=?'); }
        $q->execute([$uid,$id]);
        respond(['interested'=>$data['interested']]);
    }
    respond(['error'=>'Endpoint not found or incorrect HTTP method'],404);
} catch (Throwable $ex) {
    error_log((string)$ex);
    respond(['error'=>'Server error. Check configuration and server logs.'],500);
}
