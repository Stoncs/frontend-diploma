declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.md' {
  const value: string;
  export = value;
}
