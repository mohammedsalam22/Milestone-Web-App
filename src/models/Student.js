/**
 * Student model class for handling student data operations
 */
class Student {
  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.register_date = data.register_date;
    this.religion = data.religion;
    this.card = data.card;
    this.parent1 = data.parent1;
    this.parent2 = data.parent2;
    this.section = data.section;
  }

  /**
   * Get full name of the student
   * @returns {string}
   */
  getFullName() {
    return `${this.card?.first_name || ''} ${this.card?.last_name || ''}`.trim();
  }

  /**
   * Get formatted birth date
   * @returns {string}
   */
  getFormattedBirthDate() {
    if (!this.card?.birth_date) return 'N/A';
    return new Date(this.card.birth_date).toLocaleDateString();
  }

  /**
   * Get formatted register date
   * @returns {string}
   */
  getFormattedRegisterDate() {
    if (!this.register_date) return 'N/A';
    return new Date(this.register_date).toLocaleDateString();
  }

  /**
   * Get student's grade and section info
   * @returns {string}
   */
  getGradeSection() {
    if (!this.section) return 'N/A';
    const grade = this.section.grade?.name || '';
    const section = this.section.name || '';
    return `${grade} - Section ${section}`;
  }

  /**
   * Get student's study stage
   * @returns {string}
   */
  getStudyStage() {
    return this.section?.grade?.study_stage?.name || 'N/A';
  }

  /**
   * Get student's study year
   * @returns {string}
   */
  getStudyYear() {
    return this.section?.grade?.study_year?.name || 'N/A';
  }

  /**
   * Get parent 1 full name
   * @returns {string}
   */
  getParent1Name() {
    if (!this.parent1?.card) return 'N/A';
    return `${this.parent1.card.first_name} ${this.parent1.card.last_name}`;
  }

  /**
   * Get parent 2 full name
   * @returns {string}
   */
  getParent2Name() {
    if (!this.parent2?.card) return 'N/A';
    return `${this.parent2.card.first_name} ${this.parent2.card.last_name}`;
  }

  /**
   * Get age of the student
   * @returns {number}
   */
  getAge() {
    if (!this.card?.birth_date) return null;
    const birthDate = new Date(this.card.birth_date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get gender with proper formatting
   * @returns {string}
   */
  getFormattedGender() {
    if (!this.card?.gender) return 'N/A';
    return this.card.gender.charAt(0).toUpperCase() + this.card.gender.slice(1);
  }

  /**
   * Get nationality with proper formatting
   * @returns {string}
   */
  getFormattedNationality() {
    if (!this.card?.nationality) return 'N/A';
    return this.card.nationality.charAt(0).toUpperCase() + this.card.nationality.slice(1);
  }

  /**
   * Get religion with proper formatting
   * @returns {string}
   */
  getFormattedReligion() {
    if (!this.religion) return 'N/A';
    return this.religion.charAt(0).toUpperCase() + this.religion.slice(1);
  }

  /**
   * Get student photo URL
   * @returns {string|null}
   */
  getPhotoUrl() {
    return this.card?.photo || this.card?.image || this.card?.avatar || null;
  }

  /**
   * Convert to plain object for API calls
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      user: this.user,
      register_date: this.register_date,
      religion: this.religion,
      card: this.card,
      parent1: this.parent1,
      parent2: this.parent2,
      section: this.section,
    };
  }

  /**
   * Create Student instance from API data
   * @param {Object} data
   * @returns {Student}
   */
  static fromAPI(data) {
    return new Student(data);
  }

  /**
   * Create array of Student instances from API data
   * @param {Array} dataArray
   * @returns {Student[]}
   */
  static fromAPIArray(dataArray) {
    return dataArray.map(data => new Student(data));
  }
}

export default Student; 