const projectRoutes = {
  'project1': '1',
  'project2': '2', 
  'project3': '3',
  'project4': '4',
  'project5': '5'
};

const routeToProject = {
  '1': 'project1',
  '2': 'project2',
  '3': 'project3', 
  '4': 'project4',
  '5': 'project5'
};

function onClickProject(projectId) {
  const route = projectRoutes[projectId];
  if (route) {
    window.history.pushState({ projectId }, '', `/${route}`);
  }
  
  showProject(projectId);
}

function showProject(projectId) {
  const modal = document.getElementById("modalContainer")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")
  const githubLink = document.getElementById("githubLink")

  switch (projectId) {
    case "project1":
      modalTitle.textContent = "scango-lite"
      githubLink.href = "https://github.com/vichekaoeun/scango-lite"
      githubLink.style.display = "flex"
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
        <u>Paper referenced</u>
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
      githubLink.href = "https://github.com/vichekaoeun/netpulse"
      githubLink.style.display = "flex"
      modalBody.innerHTML =
        `
        <div>
          <p>Real-time network monitoring tool for tracking latency and packet loss across multiple targets</p>
          <br>
          <video controls class="demo-video">
            <source src="images/netpulse-demo.mp4" type="video/mp4">
            Your browser doesn't support the video tag.
          </video>
          <br>
          <h1>What it does:</h1>
          <p>
            Through running the netpulse script, it will ping different targets (IP addresses) and
            display the results in real-time, showing latency, packet loss, and jitter.
          </p>
          <h2>Daemon mode</h2>
          <p>
            You can also run netpulse in daemon mode, which will continue monitoring the network in the background.
            Within this mode, it will log the results to a file located at /dev/null
          </p>
          <h1>How it works:</h1>
          <p>
            It is entirely written in C.
            <ul>
              <li><strong>Sockets:</strong> uses raw sockets to send ICMP echo requests (pings) to the target IP addresses including
              packet creation, sending, receiving and checksum calculation
              </li>
              <li><strong>Thread & Analytics:</strong> each target IP, a pthread is created entering an infinite loop sending ping every 5s
              then a function for receiving will capture it and perform RTT calculation and if no response within a timeout then it counts as a loss</li>
              <li><strong>Real-time display:</strong> using ncurses, it displays the results in a table format in the terminal, by pulling from the statistic assessment functions</li>
          </p>
        </div>
        `
      break
    case "project3":
      modalTitle.textContent = "Idetic"
      githubLink.href = "https://github.com/vichekaoeun/idetic"
      githubLink.style.display = "flex"
      modalBody.innerHTML =
        `
        <div>
          <p>A machine learning video-to-text search engine for clips and moments within long videos</p>
          <br>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/5iVqBLHySLU" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen class="youtube-video">
          </iframe>
          <br>
          <h1>What it does:</h1>
          <p>
            Users can search for specific moments within videos from our video library by typing in keywords and it will return
            the most relevant clips based on the search query, along with timestamps.
          </p>
          <h1>How it works:</h1>
          <p> Users can upload videos, which are processed to extract both visual and textual embeddings. These embeddings are stored in a vector database (Convex).
           Users can then search using natural language, and the system retrieves the most relevant video moments based on semantic similarity.
          </p>
          <h2>1. Video Processing</h2>
          <p>
            <ol>
              <li><strong>Download Videos:</strong> download the video from Convex</li>
              <li><strong>Extract Audio:</strong> using ffmpeg to extract audio from the video</li>
              <li><strong>Split Audio:</strong> splits the audio into 10-second chunks</li>
              <li><strong>Transcribe Audio:</strong> using whisper to transcribe each audio chunk</li>
              <li><strong>Embed Text and Video frames:</strong> through a transformer, we embed text and frames</li>
              <li><strong>Upload embeddings:</strong> both text and audio are uploaded to Convex in frameEmbedding table</li>
            </ol>
          </p>
          <img src="images/idetic-video.jpg" alt="idetic video processing">
          <h2>2. Search Pipeline</h2>
          <p>
            <ol>
              <li><strong>Submits search query:</strong> submits a natural language query</li>
              <li><strong>Embed the search query:</strong> query text is embedded into vectors using the same transformer (capturing the semantic meaning)</li>
              <li><strong>Vector search:</strong> on API call, Convex performs a vector similarity search to frameEmbedding table (contains transcribe chunk and frames)</li>
              <li><strong>Retrieve matching:</strong> Convex returns a list of:
                <ul>
                  <li>video ID</li>
                  <li>timestamp (start/end)</li>
                  <li>similarity score</li>
                </ul>
              </li>
              <li><strong>Return result to frontend:</strong> displays matching video moments</li>
            </ol>
          </p>
          <img src="images/search-pipeline.jpg" alt="idetic search pipeline">
          <h2>3. Similarity Score</h2>
          <p>
            The similarity score measures how closely the search query matches each stored embeddings (from video frames or transcribed text).
            <h3>How the score is calculated</h3>
            <ul>
              <li><strong>Embeddings:</strong> both search query and video moment are represented as vectors</li>
              <li><strong>Similarity metric:</strong> using cosine similarity, it measures the angle between two vectors giving a score between -1 and 1 (0 is unrelated)</li>
              <li><strong>Rankings:</strong> compares the similary score between query embedding and every stored embedding</li>
            </ul>
          </p>
          <img src="images/vector-similarity.webp" alt="idetic vector similarity" class="vector-image">
        </div>
        `
      break
    case "project4":
      modalTitle.textContent = "Anidex"
      githubLink.href = "https://github.com/vichekaoeun/GenesisAI--AniDex"
      githubLink.style.display = "flex"
      modalBody.innerHTML =
        `
      <div>
        <p>A photo-to-art wildlife discovery platform</p>
        <br>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/oabOsslwrB4" 
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen class="youtube-video">
        </iframe>
        <br>
        <h1>What it does:</h1>
        <p>
          Users can upload a photo of an animal, and the platform will generate an pixel-art representation of that animal
          using Dall-E, storing it inside a library where users can converse with a chatbot specialist about that animal.
        </p>
        <h1>How it works:</h1>
        <h2>1. Frontend</h2>
        <p>
          <ol>
            <li><strong>Camera Access & Photo capture:</strong> using the browser's API to access the device camera and display the video stream</li>
            <li><strong>Location Capture:</strong> captures the user's latitude and longtitude when the camera page is loaded using navigator.</li>
            <li><strong>Sending data to backend:</strong> through a POST request, the following data is sent: Base64-encoded image string, user's coordinates and timestamp</li>
          </ol>
          To avoid issues with binary file uploads, we used Base64-encoded strings and downscale the image to 200x200 pixels before sending it to the backend.
        </p>
        <h2>2. Backend</h2>
        <p>
          <ol>
            <li><strong>Receive data:</strong> we setup endpoint saveImage for receiving imageBase64, longtitude/latitude and timestamp</li>
            <li><strong>Image Processing:</strong> extract Base64 image data, send it to Gemini for animal info classification</li>
            <li><strong>Generate Pixel Art:</strong> generate a pixel-art sprite using OpenAI DALL-E</li>
            <li><strong>Store Data:</strong> stores data into firestore</li>
          </ol>
        </p>
        <h2>3. Chatbot</h2>
        <p>
          The chatbot implementation is very basic, we setup an endpoint for receiving user queries, then send it to Gemini to generate a response and display
           the response in the chat window.
        </p>
        <h1>Diagram:</h1>
        <img src="images/anidex-diagram.jpg" alt="anidex diagram" class="anidex-diagram">
      </div>
      `
      break
    case "project5":
      modalTitle.textContent = "Sentinel"
      githubLink.href = "https://github.com/vichekaoeun/sentinel"
      githubLink.style.display = "flex"
      modalBody.innerHTML =
        `
      <div>
        <p>A comprehensive trade capture and risk management system for financial institutions</p>
        <br>
        <video controls class="demo-video">
          <source src="images/sentinel-demo.mp4" type="video/mp4">
          Your browser doesn't support the video tag.
        </video>
        <br>
        <h1>What it does:</h1>
        <p>
          Sentinel enables financial institutions to monitor trading activities, calculate real-time risk metrics, and generate 
          alerts when risk limits are breached. It provides traders and risk managers with immediate visibility into trading 
          positions and risk exposure through a real-time dashboard.
        </p>
        <h1>How it works:</h1>
        <h2>1. Architecture</h2>
        <p>
          The system follows a microservices-inspired architecture with clear separation of concerns, 
          utilizing event-driven design patterns for real-time processing:
          <ul>
            <li><strong>Backend (Java/Spring):</strong> Core services handle trade processing, risk calculations, and alert generation</li>
            <li><strong>Frontend (React):</strong> Real-time dashboard displays positions, alerts, and market data</li>
            <li><strong>Messaging (Kafka):</strong> Event streaming for decoupled, scalable trade processing</li>
            <li><strong>Market Data:</strong> Integration with Finnhub API for real-time price data</li>
          </ul>
        </p>
        <h2>2. Trade Processing Flow</h2>
        <p>
          <ol>
            <li><strong>Trade Capture:</strong> REST API receives trade details via POST request</li>
            <li><strong>Event Publishing:</strong> Trade published to Kafka topic for processing</li>
            <li><strong>Risk Evaluation:</strong> Multiple risk metrics calculated (position limits, P&L, exposure)</li>
            <li><strong>Alert Generation:</strong> Limit breaches trigger immediate alerts via Kafka</li>
            <li><strong>Real-time Updates:</strong> Dashboard receives updates via WebSocket connections</li>
          </ol>
        </p>
        <h2>3. Risk Management Features</h2>
        <p>
          <ul>
            <li><strong>Position Limits:</strong> Maximum position size per trading symbol</li>
            <li><strong>P&L Stop Loss:</strong> Daily loss threshold monitoring with alerts</li>
            <li><strong>Counterparty Exposure:</strong> Tracks and limits exposure to trading counterparties</li>
            <li><strong>Concentration Risk:</strong> Prevents overexposure to any single instrument</li>
            <li><strong>Alert Severity Levels:</strong> LOW, MEDIUM, HIGH, CRITICAL with real-time notifications</li>
          </ul>
        </p>
        <h2>4. Technology Stack</h2>
        <p>
          <strong>Backend:</strong>
          <ul>
            <li>Java 21 with Spring Boot 3.5.4</li>
            <li>Spring Data JPA, Spring Web, Spring WebSocket</li>
            <li>Spring Kafka for event streaming</li>
            <li>H2 Database for development (configurable for production databases)</li>
          </ul>
          
          <strong>Frontend:</strong>
          <ul>
            <li>React 18.2.0 with Tailwind CSS</li>
            <li>Recharts for data visualization</li>
            <li>STOMP over SockJS for WebSocket communication</li>
            <li>Axios for API communication</li>
          </ul>
          
          <strong>Infrastructure:</strong>
          <ul>
            <li>Apache Kafka for event streaming</li>
            <li>Docker Compose for containerization</li>
          </ul>
        </p>
        <h1>Diagram:</h1>
        <img src="images/sentinel-diagram.png" alt="Sentinel Architecture" class="architecture-diagram">
      </div>
      `
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
  
  window.history.pushState({}, '', '/');
}

window.addEventListener('popstate', function(event) {
  const path = window.location.pathname;
  
  if (path === '/') {
    closeModal();
  } else {
    const route = path.replace('/', '');
    const projectId = routeToProject[route];
    
    if (projectId) {
      showProject(projectId);
    }
  }
});

function handleRoute() {
  let path;
  
  // Check if we have a hash (from 404 redirect)
  if (window.location.hash) {
    path = window.location.hash.substring(1); // Remove the #
    
    // Clean up URL - replace hash with actual path
    window.history.replaceState({}, '', path);
  } else {
    // Normal path handling
    path = window.location.pathname;
  }
  
  if (path && path !== '/') {
    const route = path.replace('/', '');
    const projectId = routeToProject[route];
    
    if (projectId) {
      showProject(projectId);
    }
  }
}

window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('hashchange', handleRoute);