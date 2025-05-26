export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
  
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffMinutes < 2) return 'Acum un minut';
    if (diffMinutes < 60) return `Acum ${diffMinutes} minute`;
    if (diffHours < 2) return 'Acum o oră';
    if (diffHours < 24) return `${diffHours} ore în urmă`;
    if (diffDays === 1) return 'ieri';
    if (diffDays < 7) return `${diffDays} zile în urmă`;
    return date.toLocaleDateString('ro-RO');
}; 