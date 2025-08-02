

class Schedule {
  /**
   * Create a new Schedule instance
   * @param {Object} data - Schedule data
   */
  constructor(data = {}) {
    this.grade_id = data.grade_id || null;
    this.grade_name = data.grade_name || '';
    this.days = data.days || this.getDefaultDays();
  }

  /**
   * Get default days structure
   * @returns {DaySchedule[]} Default days structure
   */
  getDefaultDays() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    return days.map(day => ({
      day,
      periods: []
    }));
  }

  /**
   * Add a period to a specific day
   * @param {string} day - Day of the week
   * @param {SchedulePeriod} period - Period data
   */
  addPeriod(day, period) {
    const daySchedule = this.days.find(d => d.day === day);
    if (daySchedule) {
      daySchedule.periods.push(period);
    }
  }

  /**
   * Remove a period from a specific day
   * @param {string} day - Day of the week
   * @param {number} periodIndex - Index of the period to remove
   */
  removePeriod(day, periodIndex) {
    const daySchedule = this.days.find(d => d.day === day);
    if (daySchedule && daySchedule.periods[periodIndex]) {
      daySchedule.periods.splice(periodIndex, 1);
    }
  }

  /**
   * Update a period in a specific day
   * @param {string} day - Day of the week
   * @param {number} periodIndex - Index of the period to update
   * @param {SchedulePeriod} period - Updated period data
   */
  updatePeriod(day, periodIndex, period) {
    const daySchedule = this.days.find(d => d.day === day);
    if (daySchedule && daySchedule.periods[periodIndex]) {
      daySchedule.periods[periodIndex] = { ...daySchedule.periods[periodIndex], ...period };
    }
  }

  /**
   * Get periods for a specific day
   * @param {string} day - Day of the week
   * @returns {SchedulePeriod[]} Array of periods for the day
   */
  getDayPeriods(day) {
    const daySchedule = this.days.find(d => d.day === day);
    return daySchedule ? daySchedule.periods : [];
  }

  /**
   * Validate schedule data
   * @returns {boolean} True if valid, false otherwise
   */
  isValid() {
    return this.grade_id && this.grade_name && Array.isArray(this.days);
  }

  toJSON() {
    return {
      grade_id: this.grade_id,
      grade_name: this.grade_name,
      days: this.days
    };
  }
}

export default Schedule; 