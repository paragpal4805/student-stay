const button = document.getElementById('interest');
const status = document.getElementById('status');
button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Saving…';
  try {
    const res = await fetch('api.php?action=interest', {
      method: 'POST', headers: {'Content-Type':'application/json','X-CSRF-Token':window.CSRF},
      body: JSON.stringify({property_id: Number(button.dataset.id), interested:button.dataset.interested !== '1'})
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unable to save');
    button.dataset.interested = data.interested ? '1':'0';
    button.textContent = data.interested ? 'Remove from shortlist':'Shortlist property';
    status.textContent = data.interested ? 'Added to your shortlist.':'Removed from your shortlist.';
  } catch (error) { status.textContent = error.message; }
  finally { button.disabled = false; }
});
