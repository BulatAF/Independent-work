import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("содержит ссылку на ВКонтакте", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "ВКонтакте" })).toHaveAttribute(
      "href",
      "https://vk.ru/boolaton",
    );
  });
});
