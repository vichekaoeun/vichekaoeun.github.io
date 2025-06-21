function onClickProject(projectId) {
    const modal = document.getElementById("modalContainer")
    const modalTitle = document.getElementById("modalTitle")
    const modalBody = document.getElementById("modalBody")
  
    switch (projectId) {
      case "project1":
        modalTitle.textContent = "scango-lite"
        modalBody.innerHTML =
        `
        <div>
        <p>A lightweight static analyzer for Go security issues.</p>
        <br>
        <video controls class="demo-video">
          <source src="images/scango-lite demo.mp4" type="video/mp4">
          Your browser doesn't support the video tag.
        </video>
        <br>
        <h1>What it does:</h1>
        <p>
          scango-lite will scan through a Go application looking for security issues like, hardcoded secrets,
          sql injection, unsecure http and command injection; only scanning through the current directory you're in (folders and files).
        </p>
        <h1>How it works:</h1>
        <h2>1. File Parsing</h2>
        <p>
          The way it works is, folders are treated like a tree data structure, using Go's parser, token & ast library
          we traverse through the directory building an Abstract Syntax Tree. Each file is tokenized and
            converted into a structured representation that can be programmatically analyzed.
        </p>
        <img src="images/explanation-ast.jpeg">
        <h2>2. Rule Implementation</h2>
        <p>
          <ul>
            <li>
              <strong>Hardcoded secrets:</strong> Detects suspicious variable names with string literals
            </li>
            <li><strong>SQL injection:</strong> Identifies string concatenation in database queries</li>
            <li><strong>Command injection:</strong> Finds unsafe exec.Command() usage with user input</li>
            <li><strong>Insecure HTTP:</strong> Catches HTTP URLs in network calls</li>
          </ul>
        I had to account for:
        <ul>
          <li>String concatenation</li>
          <li>Variable assignment with SQL concatenation</li>
          <li>String concatenation</li>
        </ul>
        To do so, I used a technique called, <b>Taint Checking</b>, by inspecting left-hand side (LHS) and right-hand side (RHS)
        of assignments, we mark "tainted" data then propagating either LHS or RHS we can identify if a data is tainted.
        <img src="images/taint-tracking.png" >
        <a href="https://www.cs.columbia.edu/~suman/secure_sw_devel/taint_tracking.pdf">
          Paper referenced
        </a>
        <h2>3. Performance Benchmarks</h2>
        Out of curiousity on how fast scango-lite is, I created some benchmarks and these were some of the results:
        <p>
          <ul>
            <li><strong>559,903 lines/second</strong></li>
            <li><strong>4,015 files/second</strong></li>
            <li><strong>372ms</li>
            <li><strong>~140 lines per file average</li>
          </ul>
        </p>
        <p>
        For comparison:
          <ul>
            <li>ESLint: ~1000 - 3000 lines per sec</li>
            <li>SonarQube: ~5000 - 15000 lines per sec</li>
          </ul>
        </p>
        <p>
        For context, scango-lite focuses only on Go files, this is actually intended in the design, ignore all non-go files
        which allows me to optimize it to this level.
        </p>
        </div>
        `
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
  