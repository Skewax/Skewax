import { useContext } from "react";
import EditorContext from "../contexts/EditorContext";

const useEditor = () => useContext(EditorContext);

export default useEditor;
