import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

/** UI slice – holds UI‑related flags */
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showKeyboard: false,
    isGeneratingResponse: false,
    showCamera: true,
    // ID of the message currently being edited (null if none)
    editingMessageId: null as string | null,
  },
  reducers: {
    setShowKeyboard(state, action: PayloadAction<boolean>) {
      state.showKeyboard = action.payload;
    },
    setIsGeneratingResponse(state, action: PayloadAction<boolean>) {
      state.isGeneratingResponse = action.payload;
    },
    setShowCamera(state, action: PayloadAction<boolean>) {
      state.showCamera = action.payload;
    },
    // Set the ID of the message that is being edited
    setEditingMessageId(state, action: PayloadAction<string | null>) {
      state.editingMessageId = action.payload;
    },
  },
});

/** Message type */
export interface Message {
  id: string;
  text: string;
  isResponse: boolean;
}

/** Messages slice – chat history */
const messagesSlice = createSlice({
  name: "messages",
  initialState: [] as Message[],
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.push(action.payload);
    },
    // Edit an existing message and truncate any following messages
    editMessage(state, action: PayloadAction<{ id: string; text: string }>) {
      const index = state.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state[index].text = action.payload.text;
        // Remove all messages after the edited one (both user and AI responses)
        state.splice(index + 1);
      }
    },
    clearMessages() {
      return [] as Message[];
    },
  },
});

/** Video slice – camera availability */
const videoSlice = createSlice({
  name: "video",
  initialState: {
    cameraAvailable: false,
  },
  reducers: {
    setCameraAvailable(state, action: PayloadAction<boolean>) {
      state.cameraAvailable = action.payload;
    },
  },
});

/** Keyboard slice – temporary text from on‑screen keyboard */
const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: {
    text: "",
  },
  reducers: {
    appendKey(state, action: PayloadAction<string>) {
      state.text += action.payload;
    },
    backspace(state) {
      state.text = state.text.slice(0, -1);
    },
    addSpace(state) {
      state.text += " ";
    },
    clearText(state) {
      state.text = "";
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    messages: messagesSlice.reducer,
    video: videoSlice.reducer,
    keyboard: keyboardSlice.reducer,
  },
});

// Export actions
export const uiActions = uiSlice.actions;
export const messagesActions = messagesSlice.actions;
export const videoActions = videoSlice.actions;
export const keyboardActions = keyboardSlice.actions;

// Typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
