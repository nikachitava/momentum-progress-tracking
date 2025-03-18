export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    
    const months = [
      'იანვარი', 'თებერველი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
    
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    return `${month} ${day}, ${year}`;
  }