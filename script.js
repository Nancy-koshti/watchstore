// Toggle Mobile Menu
// Toggle Mobile Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Frontend Cart & Favorites Logic
let cartCount = 0;
let favCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}

function addToFavorites() {
  favCount++;
  document.getElementById("favCount").innerText = favCount;
}


 // Optional JS effect: fade-in on scroll
const heroContent = document.querySelector(".hero-content");
window.addEventListener("scroll", () => {
      let scrollPos = window.scrollY;
      if (scrollPos > 50) {
        heroContent.style.opacity = 0.8;
        heroContent.style.transform = "scale(0.98)";
      } else {
        heroContent.style.opacity = 1;
        heroContent.style.transform = "scale(1)";
      }
});

 // Optional small JS: scroll reveal effect
    const cards = document.querySelectorAll(".collection-card");

    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }
      });
    };

    // Initial hidden state
    cards.forEach(card => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = "all 0.6s ease-out";
    });

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();


// Optional: simple "Favorite" toggle
    const favButtons = document.querySelectorAll(".btn-fav");
    favButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (btn.textContent.includes("♡")) {
          btn.textContent = "♥ Favorited";
          btn.style.background = "#FFD700";
          btn.style.color = "#000";
        } else {
          btn.textContent = "♡ Favorite";
          btn.style.background = "transparent";
          btn.style.color = "#FFD700";
        }
      });
    });


// Scroll reveal effect for highlight boxes
    const highlights = document.querySelectorAll(".highlight-box");

    const revealOn = () => {
      const triggerBottom = window.innerHeight * 0.85;
      highlights.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          box.style.opacity = "1";
          box.style.transform = "translateY(0)";
          box.style.transition = "all 0.6s ease-out";
        }
      });
    };

    window.addEventListener("scroll", revealOn);
    revealOn();

 const reviewCards = document.getElementById("reviewCards");
    const reviews = document.getElementsByClassName("review-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let index = 0;

    function showReview(i) {
      reviewCards.style.transform = `translateX(-${i * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index++;
      if (index >= reviews.length) index = 0;
      showReview(index);
    });

    prevBtn.addEventListener("click", () => {
      index--;
      if (index < 0) index = reviews.length - 1;
      showReview(index);
    });

    // Auto-slide
    setInterval(() => {
      index++;
      if (index >= reviews.length) index = 0;
      showReview(index);
    }, 5000);


    // ==== Review Form Logic ====
    const form = document.getElementById("reviewForm");
    const ratingStars = document.querySelectorAll("#rating i");
    let selectedRating = 0;

    ratingStars.forEach(star => {
      star.addEventListener("click", () => {
        selectedRating = star.dataset.value;
        ratingStars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < selectedRating; i++) {
          ratingStars[i].classList.add("active");
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const role = document.getElementById("role").value || "Customer";
      const review = document.getElementById("review").value;

      if (!selectedRating) {
        alert("Please select a rating!");
        return;
      }

      // Build new review card
      const newCard = document.createElement("div");
      newCard.classList.add("review-card");

      // Add stars
      let starsHTML = "";
      for (let i = 0; i < selectedRating; i++) {
        starsHTML += `<i class="fas fa-star"></i>`;
      }
      for (let i = selectedRating; i < 5; i++) {
        starsHTML += `<i class="far fa-star"></i>`;
      }

      newCard.innerHTML = `
        <div class="stars">${starsHTML}</div>
        <p>"${review}"</p>
        <div class="reviewer">
          <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Customer">
          <div>
            <h4>${name}</h4>
            <span>${role}</span>
          </div>
        </div>
      `;

      reviewCards.appendChild(newCard);

      // Reset form
      form.reset();
      ratingStars.forEach(s => s.classList.remove("active"));
      selectedRating = 0;
      alert("Thank you for your review!");
    });


// -------------------Newsletter section -------------------=============
const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("email");
  const successMsg = document.getElementById("successMsg");
  const subscriberItems = document.getElementById("subscriberItems");

  // Load subscribers from localStorage
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  // Render subscriber list
  function renderSubscribers() {
    subscriberItems.innerHTML = '';
    subscribers.forEach((email, index) => {
      const div = document.createElement('div');
      div.classList.add('subscriber-item');
      div.innerHTML = `
        <span>${email}</span>
        <button onclick="unsubscribe(${index})">Unsubscribe</button>
      `;
      subscriberItems.appendChild(div);
    });
  }

  // Subscribe
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if(email === '') return;

    if(subscribers.includes(email)){
      alert('This email is already subscribed!');
      return;
    }

    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    renderSubscribers();

    emailInput.value = '';
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 3000);
  });

  // Unsubscribe
  function unsubscribe(index){
    subscribers.splice(index, 1);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    renderSubscribers();
  }

  // Initial render
  renderSubscribers();



// ============================== Footer section
const footerForm = document.getElementById("footerNewsletter");
  const footerEmail = document.getElementById("footerEmail");
  const footerSuccess = document.getElementById("footerSuccess");

  footerForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = footerEmail.value.trim();
    if(email){
      footerSuccess.style.display = "block";
      footerEmail.value = "";
      setTimeout(()=>{ footerSuccess.style.display = "none"; },3000);
    }
  });

// ============ Contact us section

  const contactForm = document.getElementById("contactForm");
  const successMss = document.getElementById("successMsg");

  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    successMss.style.display = "block";
    contactForm.reset();
    setTimeout(()=>{ successMss.style.display = "none"; }, 4000);
  });


