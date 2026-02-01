export function setupQr() {
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const link = document.getElementById('text-nick');
  const modal = document.getElementById('qr');

  if (isMobile) {
    link.href =
      'sms:+17372072022?body=Hey%20Nick%20%E2%80%94%20';
    link.target = '_blank';
  } else {
    link.href = '#';
    link.onclick = e => {
      e.preventDefault();
      modal.classList.remove('hidden');
    };
    modal.onclick = () => (modal.classList.add('hidden'));
  }
}