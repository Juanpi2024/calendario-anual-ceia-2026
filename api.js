// API Connection to Google Sheets
// CEIA Calendario 2026

const API_URL = 'https://script.google.com/macros/s/AKfycbzJtwAsZ_zjGuW7YDtWOJmNEQVvzKTZQYmo_bm9uZ0Qk3evt8l8NLd8mYOjSBWR20Qk/exec';

class CalendarAPI {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupOnlineListener();
    }

    setupOnlineListener() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Conexión restaurada');
        });
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Sin conexión - Modo offline');
        });
    }

    // Obtener todas las actividades
    async getAll() {
        try {
            const response = await fetch(`${API_URL}?action=getAll`);
            const result = await response.json();

            if (result.success) {
                // Guardar en localStorage como respaldo
                localStorage.setItem('ceia_calendar_cache', JSON.stringify(result.data));
                return { success: true, data: this.normalizeEvents(result.data) };
            }
            return result;
        } catch (error) {
            console.warn('Error al obtener datos de la nube, usando caché local:', error);
            // Intentar usar caché local
            const cached = localStorage.getItem('ceia_calendar_cache');
            if (cached) {
                return { success: true, data: this.normalizeEvents(JSON.parse(cached)), fromCache: true };
            }
            return { success: false, error: error.message };
        }
    }

    // Normalizar eventos (asegurar formato correcto)
    normalizeEvents(events) {
        return events.map(event => ({
            ...event,
            id: parseInt(event.id) || event.id,
            day: this.normalizeDay(event.day),
            responsables: Array.isArray(event.responsables) ? event.responsables : [],
            recursos: Array.isArray(event.recursos) ? event.recursos : [],
            priority: event.priority || 'normal',
            status: event.status || 'pending',
            notes: event.notes || ''
        }));
    }

    normalizeDay(day) {
        if (!day) return '';
        // Si es una fecha ISO, extraer solo el día
        if (typeof day === 'string' && day.includes('T')) {
            const date = new Date(day);
            return date.getDate().toString();
        }
        return day.toString();
    }

    // Agregar nueva actividad
    async add(activity) {
        try {
            const params = new URLSearchParams({
                action: 'add',
                data: JSON.stringify(activity)
            });

            const response = await fetch(`${API_URL}?${params}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al agregar actividad:', error);
            return { success: false, error: error.message };
        }
    }

    // Actualizar actividad
    async update(activity) {
        try {
            const params = new URLSearchParams({
                action: 'update',
                data: JSON.stringify(activity)
            });

            const response = await fetch(`${API_URL}?${params}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al actualizar actividad:', error);
            return { success: false, error: error.message };
        }
    }

    // Eliminar actividad
    async delete(id) {
        try {
            const params = new URLSearchParams({
                action: 'delete',
                id: id.toString()
            });

            const response = await fetch(`${API_URL}?${params}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al eliminar actividad:', error);
            return { success: false, error: error.message };
        }
    }

    // Actualizar estado y notas
    async updateStatus(id, status, notes) {
        try {
            const params = new URLSearchParams({
                action: 'updateStatus',
                id: id.toString(),
                status: status,
                notes: notes || ''
            });

            const response = await fetch(`${API_URL}?${params}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            return { success: false, error: error.message };
        }
    }
}

// Exportar instancia global
const calendarAPI = new CalendarAPI();
