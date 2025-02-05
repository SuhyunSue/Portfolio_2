// 섹션 감지 로직
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.toggle('active', link.hash === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

// 섹션 관찰 시작
document.querySelectorAll('.fullpage').forEach(section => {
    observer.observe(section);
});

// 네비게이션 클릭 핸들러
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.hash);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const topBtn = document.getElementById("topBtn");

// 스크롤 시 버튼 표시/숨김
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

// 버튼 클릭 시 맨 위로 스크롤
topBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


//function from Resume.html
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill-item');
  
    const animateSkill = (skill) => {
      const progress = skill.querySelector('.progress');
      const percentage = skill.querySelector('.percentage');
      const target = parseInt(percentage.getAttribute('data-target'));
      let width = 0;
  
      const frame = () => {
        if (width >= target) {
          clearInterval(id);
        } else {
          width++;
          progress.style.width = width + '%';
          percentage.textContent = width + '%';
        }
      };
  
      const id = setInterval(frame, 20);
    };
  
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skills.forEach(skill => skillObserver.observe(skill));
  });

// GitHub API URL
const API_URL = 'https://api.github.com/users/SuhyunSue/repos';

// DOM 요소 선택
const projectList = document.getElementById('project-list');

// GitHub 레포지토리 데이터 가져오기
async function fetchRepositories() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos = await response.json();
        displayRepositories(repos);
    } catch (error) {
        console.error('Failed to fetch repositories:', error);
        projectList.innerHTML = `<p class="error">Failed to load repositories: ${error.message}</p>`;
    }
}

// 레포지토리 목록 표시
function displayRepositories(repos) {
  const colors = ['#c8e5ff', '#acd8ff']; // 원하는 색상 배열

  repos.forEach((repo, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'project-item';
      listItem.style.backgroundColor = colors[index % colors.length]; // 색상 순환 적용
      listItem.innerHTML = `
          <h4>${repo.name}</h4>
          <p>${repo.description || 'No description available'}</p>
          <a href="${repo.html_url}" target="_blank"> View Repository </a>
      `;
      projectList.appendChild(listItem);
  });
}


// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', fetchRepositories);
