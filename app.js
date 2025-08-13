 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/public/app.js b/public/app.js
index de92769dc43cee9053e91ce1f77d5a1f945efdbc..a1f11a5b482eb2e6b2414ec4682620578e03fae8 100644
--- a/public/app.js
+++ b/public/app.js
@@ -2,76 +2,148 @@ const data = {
   events: JSON.parse(localStorage.getItem('events') || '[]'),
   projects: JSON.parse(localStorage.getItem('projects') || '[]'),
   tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
   shots: JSON.parse(localStorage.getItem('shots') || '[]'),
   story: JSON.parse(localStorage.getItem('story') || '[]')
 };
 
 function saveData() {
   localStorage.setItem('events', JSON.stringify(data.events));
   localStorage.setItem('projects', JSON.stringify(data.projects));
   localStorage.setItem('tasks', JSON.stringify(data.tasks));
   localStorage.setItem('shots', JSON.stringify(data.shots));
   localStorage.setItem('story', JSON.stringify(data.story));
 }
 
 document.querySelectorAll('nav button').forEach(btn => {
   btn.addEventListener('click', () => {
     document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
     document.getElementById(btn.dataset.section).classList.add('active');
   });
 });
 
 // Events
 const eventForm = document.getElementById('event-form');
 const eventList = document.getElementById('event-list');
+const calendarGrid = document.getElementById('calendar-grid');
+const currentMonthLabel = document.getElementById('current-month');
+const agendaTitle = document.getElementById('agenda-title');
+const prevMonthBtn = document.getElementById('prev-month');
+const nextMonthBtn = document.getElementById('next-month');
+
+function formatDate(year, month, day) {
+  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
+}
+
+let currentYear = new Date().getFullYear();
+let currentMonth = new Date().getMonth();
+let selectedDate = formatDate(currentYear, currentMonth, new Date().getDate());
+
+document.getElementById('event-date').value = selectedDate;
+
+prevMonthBtn.addEventListener('click', () => {
+  currentMonth--;
+  if (currentMonth < 0) {
+    currentMonth = 11;
+    currentYear--;
+  }
+  renderCalendar();
+});
+
+nextMonthBtn.addEventListener('click', () => {
+  currentMonth++;
+  if (currentMonth > 11) {
+    currentMonth = 0;
+    currentYear++;
+  }
+  renderCalendar();
+});
 
 eventForm.addEventListener('submit', e => {
   e.preventDefault();
   const title = document.getElementById('event-title').value;
   const date = document.getElementById('event-date').value;
   data.events.push({ title, date });
   saveData();
-  renderEvents();
+  renderAgenda();
+  renderCalendar();
   eventForm.reset();
+  document.getElementById('event-date').value = selectedDate;
 });
 
-function renderEvents() {
+function renderCalendar() {
+  calendarGrid.innerHTML = '';
+  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
+  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
+  currentMonthLabel.textContent = new Date(currentYear, currentMonth).toLocaleString('sk-SK', {
+    month: 'long',
+    year: 'numeric'
+  });
+  for (let i = 0; i < firstDay; i++) {
+    calendarGrid.appendChild(document.createElement('div'));
+  }
+  for (let day = 1; day <= daysInMonth; day++) {
+    const cell = document.createElement('div');
+    cell.textContent = day;
+    const dateStr = formatDate(currentYear, currentMonth, day);
+    cell.dataset.date = dateStr;
+    if (dateStr === selectedDate) cell.classList.add('selected');
+    if (data.events.some(ev => ev.date === dateStr)) cell.classList.add('has-event');
+    cell.addEventListener('click', () => {
+      selectedDate = dateStr;
+      document.getElementById('event-date').value = selectedDate;
+      renderAgenda();
+      renderCalendar();
+    });
+    calendarGrid.appendChild(cell);
+  }
+}
+
+function renderAgenda() {
   eventList.innerHTML = '';
-  data.events.sort((a, b) => a.date.localeCompare(b.date));
-  data.events.forEach((ev, idx) => {
+  const eventsForDay = data.events.filter(ev => ev.date === selectedDate);
+  const dateObj = new Date(selectedDate + 'T00:00');
+  agendaTitle.textContent = eventsForDay.length
+    ? `Udalosti na ${dateObj.toDateString()}`
+    : `No events on ${dateObj.toDateString()}`;
+  eventsForDay.forEach(ev => {
+    const idx = data.events.indexOf(ev);
     const li = document.createElement('li');
-    li.textContent = `${ev.date} - ${ev.title}`;
+    li.textContent = ev.title;
     li.addEventListener('click', () => {
       data.events.splice(idx, 1);
       saveData();
-      renderEvents();
+      renderAgenda();
+      renderCalendar();
     });
     eventList.appendChild(li);
   });
 }
 
+renderCalendar();
+renderAgenda();
+
 // Projects
 const projectForm = document.getElementById('project-form');
 const projectList = document.getElementById('project-list');
 
 projectForm.addEventListener('submit', e => {
   e.preventDefault();
   const name = document.getElementById('project-name').value;
   const deadline = document.getElementById('project-deadline').value;
   const client = document.getElementById('project-client').value;
   const desc = document.getElementById('project-desc').value;
   data.projects.push({ name, deadline, client, desc });
   saveData();
   renderProjects();
   projectForm.reset();
 });
 
 function renderProjects() {
   projectList.innerHTML = '';
   data.projects.sort((a, b) => a.deadline.localeCompare(b.deadline));
   data.projects.forEach((pr, idx) => {
     const li = document.createElement('li');
     li.innerHTML = `<strong>${pr.name}</strong> (do ${pr.deadline})<br/>Klient: ${pr.client}<br/>${pr.desc}`;
     li.addEventListener('click', () => {
       data.projects.splice(idx, 1);
       saveData();
diff --git a/public/app.js b/public/app.js
index de92769dc43cee9053e91ce1f77d5a1f945efdbc..a1f11a5b482eb2e6b2414ec4682620578e03fae8 100644
--- a/public/app.js
+++ b/public/app.js
@@ -163,30 +235,29 @@ storyForm.addEventListener('submit', e => {
     renderStory();
     storyForm.reset();
   };
   reader.readAsDataURL(file);
 });
 
 function renderStory() {
   storyList.innerHTML = '';
   data.story.forEach((panel, idx) => {
     const div = document.createElement('div');
     const img = document.createElement('img');
     img.src = panel.image;
     const caption = document.createElement('p');
     caption.textContent = `${panel.desc} | ${panel.camera}`;
     div.appendChild(img);
     div.appendChild(caption);
     div.addEventListener('click', () => {
       data.story.splice(idx, 1);
       saveData();
       renderStory();
     });
     storyList.appendChild(div);
   });
 }
 
-renderEvents();
 renderProjects();
 renderTasks();
 renderShots();
 renderStory();
 
EOF
)
