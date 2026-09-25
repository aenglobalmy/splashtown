const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('mobile-open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  let rating = 0;
  const stars = document.querySelectorAll('#starPick span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      rating = parseInt(star.dataset.v);
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.v) <= rating));
    });
  });

  document.getElementById('feedbackForm').addEventListener('submit', function(e){
    e.preventDefault();
    const form = this;
    document.getElementById('fbRating').value = rating;
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Menghantar...';
    btn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        throw new Error(data.message || 'Unknown error');
      }
      document.getElementById('thanksMsg').style.display = 'block';
      form.reset();
      stars.forEach(s => s.classList.remove('active'));
      rating = 0;
      setTimeout(() => { document.getElementById('thanksMsg').style.display = 'none'; }, 4000);
    })
    .catch((err) => {
      console.error('Feedback form submit error:', err);
      alert('Maaf, gagal menghantar. Sila cuba lagi atau hubungi kami melalui WhatsApp.');
    })
    .finally(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
