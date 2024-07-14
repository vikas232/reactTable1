import _ from 'lodash';
export const sortRowsData = (items, sortBy) => {
  const { column, desc } = sortBy;
  if (!column) {
    return items;
  }
  // Create a shallow copy of the array
  const itemsCopy = [...items];
  return itemsCopy.sort((a, b) => {
    let comparison = 0;
    try {
      if (column === "date") {
        const dateA = new Date(a[column]);
        const dateB = new Date(b[column]);

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          console.error(`Invalid date format in items: ${a}, ${b}`);
        } else {
          comparison = dateA.getTime() - dateB.getTime();
        }
      } else if (typeof a[column] === "string" && typeof b[column] === "string") {
        comparison = a[column].localeCompare(b[column]);
      } else if (a[column] < b[column]) {
        comparison = -1;
      } else if (a[column] > b[column]) {
        comparison = 1;
      }
    } catch (error) {
      console.error(`Error comparing items: ${error}`);
    }

    return desc ? -comparison : comparison;
  });
};
export const filterRowData = (fieldData, rowsData, filters) => {
  const filteredData = rowsData.filter(item => {
    return fieldData.every(field => {
      const fieldName = field.header;
      const filterValue = filters[fieldName];
      if (filterValue === '' || filterValue === undefined) return true;
      const itemValue = item[fieldName];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(filterValue.toLowerCase());
      } else if (typeof itemValue === 'number') {
        return itemValue?.toString().includes(filterValue);
      } else if (itemValue instanceof Date) {
        return itemValue.includes(filterValue); // Adjust this line if the date format is different
      } else {
        return itemValue.includes(filterValue);
      }
    });
  });
  return filteredData;
};

export const generateRandomId = (length = 2) => {
  const digits = _.range(0, 10);
  const shuffledDigits = _.shuffle(digits);
  const randomDigits = shuffledDigits.slice(0, length);
  return randomDigits.join('');
}

// export const=  formatDate(dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();

//   return `${day}-${month}-${year}`;
// }

