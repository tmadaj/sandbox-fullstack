import palette from './palette';

const dark = {
  primaryBg: palette.gray10,
  secondaryBg: palette.gray20,
  accent: palette.blue20,
  headlines: palette.blue20,
  links: palette.blue20,
  info: palette.blue20,
  success: palette.green20,
  warn: palette.yellow20,
  error: palette.red20,
};

const light = {
  primaryBg: palette.white,
  secondaryBg: palette.gray50,
  accent: palette.blue20,
  headlines: palette.blue10,
  links: palette.blue20,
  info: palette.blue10,
  success: palette.green10,
  warn: palette.yellow10,
  error: palette.red10,
};

export default { dark, light };
