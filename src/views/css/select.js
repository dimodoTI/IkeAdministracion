import {
  css
} from "lit-element"

export const select = css`
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border:none;
    border: 1px solid var(--color-gris-claro);
    background-image: none;
    background-color: var(--color-blanco);
  }
  
  select::-ms-expand {
    display: none;
  }
 
  .select {
    position: relative;
    display: grid;
    grid-gap: 0;
    grid-template-rows:26% 74%;
    line-height: 1;
    overflow: hidden;
    border-radius: 2px;
  }
  select {
    padding-top:.3rem;
    padding-left:.4rem;
    color:var(--color-negro);
    cursor: pointer;
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);
  }
  option{
      padding:0rem;
  }
  .select::after {
    content: "\\25BC";
    position: absolute;
    top: 1.3rem;
    right: 0;
    padding: 0 .4em;
    background: transparent;
    pointer-events: none;
    -webkit-transition: .25s all ease;
    -o-transition: .25s all ease;
    transition: .25s all ease;
    color:var(--color-gris-oscuro);

  }
  
  .select:hover::after {
    color: var(--color-celeste);
  }
  
  .select label{
      position:relative;
      top:.1rem;
      left:0rem;
      font-size: var(--font-label-size);
      font-weight: var(--font-label-weight);
  }
  `