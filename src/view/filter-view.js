export const createFilterTemplate = (filter) => {
  const { name, info } = filter;
  const counterTemplate = name !== 'all' ? `<span class="main-navigation__item-count">${info.count}</span>` : '';

  return `<a href="#${name}" class="main-navigation__item">${info.label} ${counterTemplate}</a>`;
};
