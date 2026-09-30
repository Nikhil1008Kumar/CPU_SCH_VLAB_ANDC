# CPU Scheduling V-Lab (Vanilla JS)

An interactive and lightweight Virtual Lab (V-Lab) for learning and experimenting with CPU scheduling algorithms, built using HTML, CSS, and JavaScript. Learners can enter process details, run different scheduling algorithms, and visualize the resulting Gantt chart and performance metrics, with no frontend frameworks or dependencies required.

🌐 Live Demo: (https://cpuschvlab.netlify.app)

---

🎯 Learning Objectives

After using this lab, learners will be able to:

- Understand how the CPU scheduler selects processes from the ready queue.
- Compare preemptive and non-preemptive scheduling strategies.
- Calculate **Waiting Time**, **Turnaround Time**, and **Response Time** for a set of processes.
- Analyze which algorithm performs best for a given workload.

---

## 🚀 Features

- **Multiple Scheduling Algorithms**
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF, non-preemptive)
  - Shortest Remaining Time First (SRTF, preemptive)
  - Round Robin (with configurable time quantum)
  - Priority Scheduling (preemptive and non-preemptive)
- **Dynamic Process Input** – Add or remove processes with custom arrival time, burst time, and priority.
- **Gantt Chart Visualization** – See the execution order of processes over time.
- **Performance Metrics** – Per-process and average waiting, turnaround, and response times.
- **Pure Vanilla JS** – No external dependencies, ensuring simplicity and speed.
- **Minimal & Fast** – Lightweight design for smooth performance on any modern browser.

---

## 🧪 How to Use the Lab

1. Open the lab in your browser.
2. Add processes by entering their **arrival time**, **burst time**, and (if required) **priority**.
3. Select a **scheduling algorithm** from the dropdown. For Round Robin, set the **time quantum**.
4. Click **Run / Simulate** to generate the Gantt chart and metrics table.
5. Change the algorithm or inputs and compare the results.

---

## 📂 Project Structure

```
cpu-scheduling-vlab/
├── images/         # Static assets (logos, icons, etc.)
├── index.html      # Main HTML file
├── styles.css      # Global styles
├── script.js       # Core JavaScript logic (scheduling algorithms & UI)
├── LICENSE         # MIT license
├── .gitignore      # Git ignore file
├── README.md       # Project documentation
└── CONTRIBUTING.md # Contribution and issue reporting guidelines
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

or

### 2. Download ZIP [not recommended]

[Download the latest release as ZIP](https://github.com/<your-username>/<your-repo-name>/archive/refs/heads/main.zip)

### 3. Extract & Open

- Extract the downloaded ZIP file to your preferred location.
- Open `index.html` in any modern web browser.

---

## 🔄 Updating Your V-Lab After a Template Patch

This lab is built on the [V-Lab Template (Vanilla JS)](https://github.com/mayankdotasm/vlab-template-v). The clean way to receive template fixes is to treat the template as an upstream remote and pull from it regularly.

### Option 1: If your base template was updated after June 2025

#### Setup (one-time)

```bash
# In your lab repo, add the template as an upstream remote
git remote add upstream https://github.com/mayankdotasm/vlab-template-v.git
```

#### Fetch & Merge Template Changes

```bash
git fetch upstream
git checkout main   # or your main branch
git merge upstream/main
```

If there are no conflicting customizations, the merge is clean. If conflicts exist (because the same files were changed differently), Git will show them and you can resolve them manually.

#### Alternative: Git Rebase (Cleaner History)

```bash
git fetch upstream
git rebase upstream/main
```

This keeps your custom commits on top of the latest template.

### Option 2: ZIP method for older templates (not recommended)

- Downloading the repo as a ZIP and copying files manually loses all Git history.
- Merging future template updates becomes painful and error-prone.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on proposing changes and reporting issues.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## Need Help?

Open an [issue](https://github.com/<your-username>/<your-repo-name>/issues) and we'll be happy to help!
