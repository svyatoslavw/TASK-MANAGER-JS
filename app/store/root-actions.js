import { boardsSlice } from './board/board.slice'

export const rootActions = {
  ...boardsSlice.actions,
}
