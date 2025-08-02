class Post {
  constructor(data = {}) {
    this.id = data.id || null;
    this.user = data.user || '';
    this.is_public = data.is_public || true;
    this.title = data.title || '';
    this.text = data.text || '';
    this.sections = data.sections || [];
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
    this.attachments = data.attachments || [];
    this.comments = data.comments || [];
  }

  // Get formatted creation date
  get formattedCreatedAt() {
    return new Date(this.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Get formatted updated date
  get formattedUpdatedAt() {
    return new Date(this.updated_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Get time ago
  get timeAgo() {
    const now = new Date();
    const created = new Date(this.created_at);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  // Get image attachments
  get imageAttachments() {
    return this.attachments.filter(attachment => attachment.file_type === 'image');
  }

  // Get file attachments
  get fileAttachments() {
    return this.attachments.filter(attachment => attachment.file_type === 'file');
  }

  // Get comments count
  get commentsCount() {
    return this.comments.length;
  }

  // Get total replies count (including nested replies)
  get totalRepliesCount() {
    let count = 0;
    this.comments.forEach(comment => {
      count += this.countReplies(comment);
    });
    return count;
  }

  // Helper method to count replies recursively
  countReplies(comment) {
    let count = comment.replies ? comment.replies.length : 0;
    if (comment.replies) {
      comment.replies.forEach(reply => {
        count += this.countReplies(reply);
      });
    }
    return count;
  }

  // Validate post data
  static validate(postData) {
    const errors = {};

    if (!postData.title || postData.title.trim().length === 0) {
      errors.title = 'Title is required';
    }

    if (!postData.text || postData.text.trim().length === 0) {
      errors.text = 'Text content is required';
    }

    if (postData.title && postData.title.length > 200) {
      errors.title = 'Title must be less than 200 characters';
    }

    if (postData.text && postData.text.length > 5000) {
      errors.text = 'Text content must be less than 5000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Create post from form data
  static fromFormData(formData) {
    return new Post({
      title: formData.title,
      text: formData.text,
      sections: formData.section_ids || [],
      attachments: formData.attachments || [],
    });
  }

  // Convert to API format
  toApiFormat() {
    return {
      title: this.title,
      text: this.text,
      section_ids: this.sections.map(section => section.id || section),
      attachments: this.attachments,
    };
  }

  // Clone post
  clone() {
    return new Post({
      ...this,
      comments: [...this.comments],
      attachments: [...this.attachments],
      sections: [...this.sections],
    });
  }
}

export default Post; 