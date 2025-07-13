let musicStarted = false;

function flipCard(card) {
  // Cek jika kartu masih grayscale (belum lulus)
  if (card.classList.contains('uno-grayscale')) {
    const name = card.getAttribute('data-name');
    const zonkSound = document.getElementById('zonk-sound');
    zonkSound.currentTime = 0;
    zonkSound.play();

    // Tambahkan efek visual
    card.classList.add('flash');
    card.classList.add('shake');

    // Tambahkan getaran (vibration API)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]); // Getar 100ms, jeda 50ms, getar lagi 100ms
    }

    // Setelah 300ms, munculkan alert
    setTimeout(() => {
      card.classList.remove('flash');
      card.classList.remove('shake');

      if (name === "Aurora") {
        alert("Maaf Aurora, kamu masih dalam proses untuk mendapatkan gelar S.Tr.Ak. Tunggu beberapa hari lagi.");
      } else if (name === "Amanda") {
        alert("Maaf Amanda, kamu masih dalam proses untuk mendapatkan gelar S.Kom. Tunggu sampai waktunya tiba.");
      }

      // Stop suara zonk
      zonkSound.pause();
      zonkSound.currentTime = 0;

    }, 300);

    return; // jangan lanjut ke flip
  }

  // Flip kartu (toggle)
  card.classList.toggle('flipped');

  const isAgnes = card.classList.contains('uno-colored');
  const music = document.getElementById('agnes-audio');

  if (isAgnes) {
    if (card.classList.contains('flipped') && !musicStarted) {
      music.play();
      musicStarted = true;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } else if (!card.classList.contains('flipped') && musicStarted) {
      music.pause();
      music.currentTime = 0;
      musicStarted = false;
    }
  }
}
