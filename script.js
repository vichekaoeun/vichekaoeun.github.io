function onClickProject(projectId) {
    const modal = document.getElementById("modalContainer")
    const modalTitle = document.getElementById("modalTitle")
    const modalBody = document.getElementById("modalBody")
  
    switch (projectId) {
      case "project1":
        modalTitle.textContent = "scango-lite"
        modalBody.innerHTML =
          "<p>A lightweight static analyzer for Go security issues.</p>"
        break
      case "project2":
        modalTitle.textContent = "netpulse"
        modalBody.innerHTML =
          "<p>Real-time network monitoring tool for tracking latency and packet loss across multiple targets</p>"
        break
      case "project3":
        modalTitle.textContent = "Idetic"
        modalBody.innerHTML =
          "<p>A machine learning video-to-text search engine for clips and moments within long videos</p>"
        break
      case "project4":
        modalTitle.textContent = "Anidex"
        modalBody.innerHTML =
          "<p>A photo-to-art wildlife discovery platform</p>"
        break
    }
  
    modal.classList.add("active")
  
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }
  
  function closeModal() {
    const modal = document.getElementById("modalContainer")
    modal.classList.remove("active")
  }
  