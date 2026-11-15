<?php
require dirname(__DIR__).'/app/bootstrap.php';
$id=filter_var($_GET['id'] ?? '',FILTER_VALIDATE_INT);
$q=db()->prepare('SELECT * FROM properties WHERE id=?'); $q->execute([$id ?: 0]); $p=$q->fetch();
if (!$p) { http_response_code(404); exit('Property not found.'); }
$q=db()->prepare('SELECT a.name FROM amenities a JOIN property_amenities pa ON pa.amenity_id=a.id WHERE pa.property_id=? ORDER BY a.name'); $q->execute([$id]); $amenities=$q->fetchAll(PDO::FETCH_COLUMN);
$q=db()->prepare('SELECT path,alt_text FROM property_images WHERE property_id=? ORDER BY sort_order,id'); $q->execute([$id]); $images=$q->fetchAll();
$q=db()->prepare('SELECT 1 FROM interested_users WHERE user_id=? AND property_id=?'); $q->execute([$_SESSION['uid'] ?? 0,$id]); $interested=(bool)$q->fetchColumn();
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title><?= e($p['name']) ?> | StudentStay</title><link rel="stylesheet" href="assets/app.css"></head><body>
<nav class="navbar bg-white border-bottom"><div class="container"><a class="navbar-brand" href="index.php">StudentStay</a><a href="index.php">Back to listings</a></div></nav>
<main class="container py-5"><p class="text-secondary">Demo property · <?= e($p['city']) ?></p><h1><?= e($p['name']) ?></h1><p><?= e($p['address']) ?></p>
<div class="row g-3 my-3"><?php foreach($images as $image): ?><div class="col-md-6"><a href="<?= e($image['path']) ?>" target="_blank" rel="noopener"><img class="gallery-image" src="<?= e($image['path']) ?>" alt="<?= e($image['alt_text']) ?>"></a></div><?php endforeach; ?></div>
<div class="row g-4"><section class="col-lg-8"><h2>About this property</h2><p><?= e($p['description']) ?></p><h2>Amenities</h2><ul><?php foreach($amenities as $a): ?><li><?= e($a) ?></li><?php endforeach; ?></ul><p>Sample rating: <?= e($p['rating']) ?>/5 · <?= e($p['gender']) ?></p></section>
<aside class="col-lg-4"><div class="card p-4"><h2>₹<?= number_format((float)$p['price']) ?> / month</h2>
<button id="interest" class="btn btn-primary" data-id="<?= (int)$id ?>" data-interested="<?= $interested ? '1':'0' ?>"><?= $interested ? 'Remove from shortlist':'Shortlist property' ?></button><p id="status" class="mt-3" role="status"></p><small>Illustrative rent only. No booking or payment is processed.</small></div></aside></div></main>
<script>window.CSRF = <?= json_encode($_SESSION['csrf']) ?>;</script><script src="detail.js" defer></script></body></html>
