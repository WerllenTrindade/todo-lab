
// Mock simples que funciona com o render do testing-library
export default "Icon";

// ou se quiser suportar imports nomeados (como FontAwesome)
export const FontAwesome = "Icon";

jest.mock("@expo/vector-icons/Feather", () => {
  return {
    __esModule: true,
    default: "Feather",
  };
});