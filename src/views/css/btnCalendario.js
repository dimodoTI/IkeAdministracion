import {
    css
} from "lit-element"

export const btnCalendario = css `
.btnCalendario{
    text-align:center;
    font-size: var(--font-bajada-size);
    font-weight: bold;
    border-bottom: solid;
    cursor:pointer;
}
.btnCalendario[pres]{
    cursor: not-allowed;
    pointer-events: none;
    border-color: var(--color-celeste);
    color: var(--color-celeste);
    border-width: thick;
}
.btnCalendario[nopres]{
    cursor:pointer;
    color: var(--color-gris);
    border-color: var(--color-gris);
    border-width: thin;
}
`