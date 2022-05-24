/// <reference types="react-scripts" />
interface Window {
  ethereum: any,
  payload: any
}
declare module "@metamask/jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement;
}
