// CEIA Calendar Panel de Control - Main Logic
class CalendarApp {
    constructor() {
        this.events = this.loadEvents();
        this.filteredEvents = [...this.events];
        this.currentMonth = 'all';
        this.currentCategory = 'all';
        this.currentStatus = 'all';
        this.currentView = 'grid';
        this.currentEventId = null;
        this.editingEventId = null;
        this.calendarMonth = 'marzo';
        this.eventStates = this.loadEventStates();
        this.nextEventId = this.getNextEventId();

        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderCalendar();
        this.renderEvents();
        this.updateStats();
    }

    loadEvents() {
        try {
            const saved = localStorage.getItem('ceia_calendar_events');
            if (saved) {
                const customEvents = JSON.parse(saved);
                // Merge with base events
                const baseIds = calendarData.map(e => e.id);
                const onlyCustom = customEvents.filter(e => !baseIds.includes(e.id));
                return [...calendarData, ...onlyCustom];
            }
        } catch (e) {
            console.error('Error loading events:', e);
        }
        return [...calendarData];
    }

    saveEvents() {
        try {
            // Only save custom events (not base data)
            const baseIds = calendarData.map(e => e.id);
            const customEvents = this.events.filter(e => !baseIds.includes(e.id) || e.modified);
            localStorage.setItem('ceia_calendar_events', JSON.stringify(this.events));
        } catch (e) {
            console.error('Error saving events:', e);
        }
    }

    getNextEventId() {
        return Math.max(...this.events.map(e => e.id), 0) + 1;
    }

    cacheElements() {
        // Stats
        this.totalEventsEl = document.getElementById('totalEvents');
        this.pendingEventsEl = document.getElementById('pendingEvents');
        this.inProgressEventsEl = document.getElementById('inProgressEvents');
        this.completedEventsEl = document.getElementById('completedEvents');

        // Calendar
        this.calendarGrid = document.getElementById('calendarGrid');
        this.currentMonthLabel = document.getElementById('currentMonthLabel');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');

        // Filters
        this.monthTabs = document.getElementById('monthTabs');
        this.categoryFilters = document.getElementById('categoryFilters');
        this.statusFilters = document.getElementById('statusFilters');
        this.searchInput = document.getElementById('searchInput');

        // Events
        this.eventsGrid = document.getElementById('eventsGrid');
        this.noResults = document.getElementById('noResults');

        // View toggle
        this.gridViewBtn = document.getElementById('gridView');
        this.listViewBtn = document.getElementById('listView');

        // FAB
        this.fabAdd = document.getElementById('fabAdd');

        // View Modal
        this.modal = document.getElementById('eventModal');
        this.modalClose = document.getElementById('modalClose');
        this.modalCancel = document.getElementById('modalCancel');
        this.modalSave = document.getElementById('modalSave');
        this.modalEditBtn = document.getElementById('modalEditBtn');
        this.modalDeleteBtn = document.getElementById('modalDeleteBtn');
        this.modalBadge = document.getElementById('modalBadge');
        this.modalCategory = document.getElementById('modalCategory');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDate = document.getElementById('modalDate');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalResponsables = document.getElementById('modalResponsables');
        this.modalRecursos = document.getElementById('modalRecursos');
        this.modalPrioridad = document.getElementById('modalPrioridad');
        this.statusSelector = document.getElementById('statusSelector');
        this.modalNotes = document.getElementById('modalNotes');

        // Edit Modal
        this.editModal = document.getElementById('editModal');
        this.editModalClose = document.getElementById('editModalClose');
        this.editModalCancel = document.getElementById('editModalCancel');
        this.editModalSave = document.getElementById('editModalSave');
        this.editModalTitle = document.getElementById('editModalTitle');
        this.editModalCategoryDisplay = document.getElementById('editModalCategoryDisplay');
        this.eventForm = document.getElementById('eventForm');

        // Delete Modal
        this.deleteModal = document.getElementById('deleteModal');
        this.deleteModalCancel = document.getElementById('deleteModalCancel');
        this.deleteModalConfirm = document.getElementById('deleteModalConfirm');

        // Export
        this.exportBtn = document.getElementById('exportBtn');
    }

    bindEvents() {
        // Calendar navigation
        this.prevMonthBtn.addEventListener('click', () => this.navigateCalendar(-1));
        this.nextMonthBtn.addEventListener('click', () => this.navigateCalendar(1));

        // Month filter
        this.monthTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('month-tab')) {
                this.setActiveFilter(this.monthTabs, e.target);
                this.currentMonth = e.target.dataset.month;
                this.applyFilters();
            }
        });

        // Category filter
        this.categoryFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) {
                this.setActiveFilter(this.categoryFilters, btn);
                this.currentCategory = btn.dataset.category;
                this.applyFilters();
            }
        });

        // Status filter
        this.statusFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('status-btn')) {
                this.setActiveFilter(this.statusFilters, e.target);
                this.currentStatus = e.target.dataset.status;
                this.applyFilters();
            }
        });

        // Search
        this.searchInput.addEventListener('input', () => this.applyFilters());

        // View toggle
        this.gridViewBtn.addEventListener('click', () => {
            this.currentView = 'grid';
            this.gridViewBtn.classList.add('active');
            this.listViewBtn.classList.remove('active');
            this.eventsGrid.classList.remove('list-view');
        });

        this.listViewBtn.addEventListener('click', () => {
            this.currentView = 'list';
            this.listViewBtn.classList.add('active');
            this.gridViewBtn.classList.remove('active');
            this.eventsGrid.classList.add('list-view');
        });

        // FAB - Add new event
        this.fabAdd.addEventListener('click', () => this.openEditModal());

        // View Modal
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalCancel.addEventListener('click', () => this.closeModal());
        this.modalSave.addEventListener('click', () => this.saveEventChanges());
        this.modalEditBtn.addEventListener('click', () => {
            this.closeModal();
            this.openEditModal(this.currentEventId);
        });
        this.modalDeleteBtn.addEventListener('click', () => {
            this.closeModal();
            this.openDeleteModal(this.currentEventId);
        });
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Status selector
        this.statusSelector.addEventListener('click', (e) => {
            const btn = e.target.closest('.status-option');
            if (btn) {
                this.statusSelector.querySelectorAll('.status-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });

        // Edit Modal
        this.editModalClose.addEventListener('click', () => this.closeEditModal());
        this.editModalCancel.addEventListener('click', () => this.closeEditModal());
        this.editModalSave.addEventListener('click', () => this.saveEvent());
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeEditModal();
        });

        // Delete Modal
        this.deleteModalCancel.addEventListener('click', () => this.closeDeleteModal());
        this.deleteModalConfirm.addEventListener('click', () => this.deleteEvent());
        this.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.deleteModal) this.closeDeleteModal();
        });

        // Export
        this.exportBtn.addEventListener('click', () => this.exportCalendar());

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.modal.classList.contains('active')) this.closeModal();
                if (this.editModal.classList.contains('active')) this.closeEditModal();
                if (this.deleteModal.classList.contains('active')) this.closeDeleteModal();
            }
        });
    }

    // Calendar Navigation
    navigateCalendar(direction) {
        const months = ['marzo', 'abril', 'mayo', 'junio', 'julio'];
        const currentIndex = months.indexOf(this.calendarMonth);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < months.length) {
            this.calendarMonth = months[newIndex];
            this.renderCalendar();
        }
    }

    renderCalendar() {
        const monthData = monthsData[this.calendarMonth];
        this.currentMonthLabel.textContent = `${monthLabels[this.calendarMonth]} 2026`;

        // Get events for this month
        const monthEvents = this.events.filter(e => e.month === this.calendarMonth);

        // Days of week headers
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        let html = dayNames.map(d => `<div class="calendar-day-header">${d}</div>`).join('');

        // Empty days before first day
        for (let i = 0; i < monthData.startDay; i++) {
            html += '<div class="calendar-day other-month"></div>';
        }

        // Days of month
        for (let day = 1; day <= monthData.daysInMonth; day++) {
            const dayEvents = this.getEventsForDay(day, this.calendarMonth);
            const hasEvents = dayEvents.length > 0;
            const isToday = this.isToday(day, this.calendarMonth);

            html += `
                <div class="calendar-day ${hasEvents ? 'has-events' : ''} ${isToday ? 'today' : ''}" 
                     data-day="${day}" data-month="${this.calendarMonth}">
                    <span class="day-number">${day}</span>
                    <div class="day-events">
                        ${dayEvents.slice(0, 3).map(e =>
                `<div class="day-event-dot ${e.category}" title="${e.title}"></div>`
            ).join('')}
                        ${dayEvents.length > 3 ? `<span class="day-more">+${dayEvents.length - 3}</span>` : ''}
                    </div>
                </div>
            `;
        }

        this.calendarGrid.innerHTML = html;

        // Bind click events to calendar days
        this.calendarGrid.querySelectorAll('.calendar-day.has-events').forEach(day => {
            day.addEventListener('click', () => {
                const dayNum = day.dataset.day;
                const month = day.dataset.month;
                this.showDayEvents(dayNum, month);
            });
        });
    }

    getEventsForDay(day, month) {
        return this.events.filter(e => {
            if (e.month !== month) return false;
            const dayStr = e.day.toString();

            // Handle range (e.g., "09-13")
            if (dayStr.includes('-')) {
                const [start, end] = dayStr.split('-').map(d => parseInt(d));
                return day >= start && day <= end;
            }

            return parseInt(dayStr) === day;
        });
    }

    isToday(day, month) {
        const today = new Date();
        const monthIndex = { marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6 };
        return today.getDate() === day &&
            today.getMonth() === monthIndex[month] &&
            today.getFullYear() === 2026;
    }

    showDayEvents(day, month) {
        // Filter to show only events for this day
        this.currentMonth = month;
        this.searchInput.value = '';

        // Update month tabs
        this.monthTabs.querySelectorAll('.month-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.month === month);
        });

        // Apply filter and scroll to events
        this.applyFilters();
        document.querySelector('.events-section').scrollIntoView({ behavior: 'smooth' });
    }

    setActiveFilter(container, activeElement) {
        container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        activeElement.classList.add('active');
    }

    applyFilters() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();

        this.filteredEvents = this.events.filter(event => {
            if (this.currentMonth !== 'all' && event.month !== this.currentMonth) return false;
            if (this.currentCategory !== 'all' && event.category !== this.currentCategory) return false;

            const eventState = this.eventStates[event.id] || { status: 'pending' };
            if (this.currentStatus !== 'all' && eventState.status !== this.currentStatus) return false;

            if (searchTerm) {
                const searchableText = `${event.title} ${event.description} ${event.month} ${event.day} ${(event.responsables || []).join(' ')}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) return false;
            }

            return true;
        });

        this.renderEvents();
    }

    getEventStatus(eventId) {
        const state = this.eventStates[eventId];
        return state ? state.status : 'pending';
    }

    getEventNotes(eventId) {
        const state = this.eventStates[eventId];
        return state ? state.notes : '';
    }

    renderEvents() {
        if (this.filteredEvents.length === 0) {
            this.eventsGrid.innerHTML = '';
            this.noResults.style.display = 'block';
            return;
        }

        this.noResults.style.display = 'none';

        // Sort by date
        const sortedEvents = [...this.filteredEvents].sort((a, b) => {
            const monthOrder = { marzo: 1, abril: 2, mayo: 3, junio: 4, julio: 5 };
            if (monthOrder[a.month] !== monthOrder[b.month]) {
                return monthOrder[a.month] - monthOrder[b.month];
            }
            return parseInt(a.day) - parseInt(b.day);
        });

        this.eventsGrid.innerHTML = sortedEvents.map((event, index) => {
            const status = this.getEventStatus(event.id);
            const statusLabel = statusLabels[status];
            const hasResponsables = event.responsables && event.responsables.length > 0;
            const hasRecursos = event.recursos && event.recursos.length > 0;

            return `
                <div class="event-card" data-id="${event.id}" data-category="${event.category}" style="animation-delay: ${Math.min(index * 0.03, 0.3)}s">
                    <div class="event-card-header">
                        <div class="event-date">
                            <span class="day">${event.day.split('-')[0]}</span>
                            <span class="month">${event.month.substring(0, 3)}</span>
                        </div>
                        <div class="event-status ${status}">
                            <span class="status-dot ${status}"></span>
                            ${statusLabel}
                        </div>
                    </div>
                    <div class="event-card-body">
                        <span class="event-category ${event.category}">${categoryLabels[event.category]}</span>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                        ${hasResponsables || hasRecursos ? `
                        <div class="event-meta">
                            ${hasResponsables ? `
                            <span class="event-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                </svg>
                                ${event.responsables.length}
                            </span>` : ''}
                            ${hasRecursos ? `
                            <span class="event-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                </svg>
                                ${event.recursos.length}
                            </span>` : ''}
                        </div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Bind click events
        this.eventsGrid.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openModal(parseInt(card.dataset.id));
            });
        });
    }

    // View Modal
    openModal(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        this.currentEventId = eventId;
        const status = this.getEventStatus(eventId);
        const notes = this.getEventNotes(eventId);

        // Category styling
        this.modalCategory.className = `modal-category ${event.category}`;
        this.modalCategory.textContent = categoryLabels[event.category];

        // Content
        this.modalTitle.textContent = event.title;
        this.modalDate.textContent = `${event.day} de ${monthLabels[event.month]} 2026`;
        this.modalDescription.textContent = event.description;

        // Responsables
        if (event.responsables && event.responsables.length > 0) {
            this.modalResponsables.innerHTML = event.responsables.map(r => `<span class="tag">${r}</span>`).join('');
        } else {
            this.modalResponsables.innerHTML = '<span class="tag empty">Sin asignar</span>';
        }

        // Recursos
        if (event.recursos && event.recursos.length > 0) {
            this.modalRecursos.innerHTML = event.recursos.map(r => `<span class="tag">${r}</span>`).join('');
        } else {
            this.modalRecursos.innerHTML = '<span class="tag empty">Sin recursos</span>';
        }

        // Priority
        const priority = event.priority || 'normal';
        this.modalPrioridad.innerHTML = `<span class="priority-badge ${priority}">${priorityLabels[priority]}</span>`;

        // Status
        this.statusSelector.querySelectorAll('.status-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.status === status);
        });

        // Notes
        this.modalNotes.value = notes;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEventId = null;
    }

    saveEventChanges() {
        if (!this.currentEventId) return;

        const activeStatusBtn = this.statusSelector.querySelector('.status-option.active');
        const newStatus = activeStatusBtn ? activeStatusBtn.dataset.status : 'pending';
        const notes = this.modalNotes.value;

        this.eventStates[this.currentEventId] = { status: newStatus, notes: notes };
        this.saveEventStates();
        this.updateStats();
        this.applyFilters();
        this.renderCalendar();
        this.closeModal();
        this.showToast('Cambios guardados correctamente');
    }

    // Edit Modal
    openEditModal(eventId = null) {
        this.editingEventId = eventId;

        if (eventId) {
            const event = this.events.find(e => e.id === eventId);
            if (!event) return;

            this.editModalTitle.textContent = 'Editar Actividad';
            this.editModalCategoryDisplay.textContent = 'Editando';
            this.editModalCategoryDisplay.className = `modal-category ${event.category}`;

            // Fill form
            document.getElementById('formTitle').value = event.title;
            document.getElementById('formDay').value = event.day;
            document.getElementById('formMonth').value = event.month;
            document.getElementById('formCategory').value = event.category;
            document.getElementById('formPriority').value = event.priority || 'normal';
            document.getElementById('formDescription').value = event.description || '';
            document.getElementById('formResponsables').value = (event.responsables || []).join(', ');
            document.getElementById('formRecursos').value = (event.recursos || []).join(', ');
        } else {
            this.editModalTitle.textContent = 'Agregar Nueva Actividad';
            this.editModalCategoryDisplay.textContent = 'Nueva Actividad';
            this.editModalCategoryDisplay.className = 'modal-category interno';
            this.eventForm.reset();
        }

        this.editModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeEditModal() {
        this.editModal.classList.remove('active');
        document.body.style.overflow = '';
        this.editingEventId = null;
        this.eventForm.reset();
    }

    saveEvent() {
        const title = document.getElementById('formTitle').value.trim();
        const day = document.getElementById('formDay').value.trim();
        const month = document.getElementById('formMonth').value;
        const category = document.getElementById('formCategory').value;
        const priority = document.getElementById('formPriority').value;
        const description = document.getElementById('formDescription').value.trim();
        const responsablesStr = document.getElementById('formResponsables').value.trim();
        const recursosStr = document.getElementById('formRecursos').value.trim();

        if (!title || !day || !month) {
            this.showToast('Por favor completa los campos obligatorios', 'error');
            return;
        }

        const responsables = responsablesStr ? responsablesStr.split(',').map(r => r.trim()).filter(r => r) : [];
        const recursos = recursosStr ? recursosStr.split(',').map(r => r.trim()).filter(r => r) : [];

        if (this.editingEventId) {
            // Update existing event
            const eventIndex = this.events.findIndex(e => e.id === this.editingEventId);
            if (eventIndex !== -1) {
                this.events[eventIndex] = {
                    ...this.events[eventIndex],
                    title, day, month, category, priority, description, responsables, recursos,
                    modified: true
                };
            }
            this.showToast('Actividad actualizada correctamente');
        } else {
            // Create new event
            const newEvent = {
                id: this.nextEventId++,
                title, day, month, category, priority, description, responsables, recursos
            };
            this.events.push(newEvent);
            this.showToast('Nueva actividad agregada correctamente');
        }

        this.saveEvents();
        this.applyFilters();
        this.renderCalendar();
        this.updateStats();
        this.closeEditModal();
    }

    // Delete Modal
    openDeleteModal(eventId) {
        this.editingEventId = eventId;
        this.deleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDeleteModal() {
        this.deleteModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    deleteEvent() {
        if (!this.editingEventId) return;

        this.events = this.events.filter(e => e.id !== this.editingEventId);
        delete this.eventStates[this.editingEventId];

        this.saveEvents();
        this.saveEventStates();
        this.applyFilters();
        this.renderCalendar();
        this.updateStats();
        this.closeDeleteModal();
        this.showToast('Actividad eliminada correctamente');
    }

    // LocalStorage
    loadEventStates() {
        try {
            const saved = localStorage.getItem('ceia_calendar_states');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    saveEventStates() {
        try {
            localStorage.setItem('ceia_calendar_states', JSON.stringify(this.eventStates));
        } catch (e) {
            console.error('Error saving event states:', e);
        }
    }

    updateStats() {
        let pending = 0, inProgress = 0, completed = 0;

        this.events.forEach(event => {
            const status = this.getEventStatus(event.id);
            if (status === 'pending') pending++;
            else if (status === 'in-progress') inProgress++;
            else if (status === 'completed') completed++;
        });

        this.animateNumber(this.totalEventsEl, this.events.length);
        this.animateNumber(this.pendingEventsEl, pending);
        this.animateNumber(this.inProgressEventsEl, inProgress);
        this.animateNumber(this.completedEventsEl, completed);
    }

    animateNumber(element, target) {
        const current = parseInt(element.textContent) || 0;
        if (current === target) return;

        const duration = 400;
        const steps = 15;
        const increment = (target - current) / steps;
        let step = 0;

        const animate = () => {
            step++;
            element.textContent = Math.round(current + (increment * step));
            if (step < steps) {
                setTimeout(animate, duration / steps);
            } else {
                element.textContent = target;
            }
        };
        animate();
    }

    exportCalendar() {
        let csv = 'Fecha,Mes,Título,Categoría,Estado,Prioridad,Responsables,Recursos,Notas\n';

        this.events.forEach(event => {
            const status = this.getEventStatus(event.id);
            const notes = this.getEventNotes(event.id).replace(/"/g, '""');
            const responsables = (event.responsables || []).join('; ');
            const recursos = (event.recursos || []).join('; ');

            csv += `"${event.day}","${monthLabels[event.month]}","${event.title}","${categoryLabels[event.category]}","${statusLabels[status]}","${priorityLabels[event.priority || 'normal']}","${responsables}","${recursos}","${notes}"\n`;
        });

        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'calendario_ceia_2026.csv';
        link.click();

        this.showToast('Calendario exportado correctamente');
    }

    showToast(message, type = 'success') {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.background = type === 'error'
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #10b981, #06b6d4)';

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp();
});
