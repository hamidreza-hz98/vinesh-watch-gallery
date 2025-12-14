export function getDrawerSxTransitionMixin(isExpanded, property) {
  return {
    transition: (theme) =>
      theme.transitions.create(property, {
        easing: theme.transitions.easing.sharp,
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
  };
}

export function getDrawerWidthTransitionMixin(isExpanded) {
  return {
    ...getDrawerSxTransitionMixin(isExpanded, 'width'),
    overflowX: 'hidden',
  };
}

export function matchPath(pattern, pathname) {
  const regex = new RegExp(
    '^' +
      pattern
        .replace(/\*/g, '.*')
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.') +
      '$'
  );
  return regex.test(pathname);
}