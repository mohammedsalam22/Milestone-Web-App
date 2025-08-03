class PlacementTest {
  constructor(data) {
    this.id = data.id;
    this.placement_date = data.placement_date;
    this.placement_result = data.placement_result;
    this.student_religion = data.student_religion;
    this.student_card = data.student_card;
    this.parent1_job = data.parent1_job;
    this.parent1_card = data.parent1_card;
    this.parent2_job = data.parent2_job;
    this.parent2_card = data.parent2_card;
  }

  getStudentFullName() {
    if (!this.student_card) return 'N/A';
    return `${this.student_card.first_name || ''} ${this.student_card.last_name || ''}`.trim() || 'N/A';
  }

  getParent1FullName() {
    if (!this.parent1_card) return 'N/A';
    return `${this.parent1_card.first_name || ''} ${this.parent1_card.last_name || ''}`.trim() || 'N/A';
  }

  getParent2FullName() {
    if (!this.parent2_card) return 'N/A';
    return `${this.parent2_card.first_name || ''} ${this.parent2_card.last_name || ''}`.trim() || 'N/A';
  }

  getResultStatus() {
    if (this.placement_result === null || this.placement_result === undefined) return 'pending';
    return this.placement_result ? 'passed' : 'failed';
  }

  getAge() {
    if (!this.student_card?.birth_date) return 'N/A';
    const today = new Date();
    const birth = new Date(this.student_card.birth_date);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years`;
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }

  getStudentBirthDate() {
    return this.formatDate(this.student_card?.birth_date);
  }

  getStudentGender() {
    return this.student_card?.gender || 'N/A';
  }

  getStudentNationality() {
    return this.student_card?.nationality || 'N/A';
  }

  getStudentPhone() {
    return this.student_card?.phone || 'N/A';
  }

  getStudentAddress() {
    return this.student_card?.address || 'N/A';
  }

  getStudentBirthCity() {
    return this.student_card?.birth_city || 'N/A';
  }

  getStudentNationalId() {
    return this.student_card?.national_no || 'N/A';
  }

  getParent1Phone() {
    return this.parent1_card?.phone || 'N/A';
  }

  getParent2Phone() {
    return this.parent2_card?.phone || 'N/A';
  }

  isPassed() {
    return this.placement_result === true;
  }

  isFailed() {
    return this.placement_result === false;
  }

  isPending() {
    return this.placement_result === null || this.placement_result === undefined;
  }
}

export default PlacementTest; 