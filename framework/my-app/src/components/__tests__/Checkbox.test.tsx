import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("показывает подпись и переключается по клику", async () => {
    render(<Checkbox id="keep">Запомнить меня</Checkbox>);
    const checkbox = screen.getByLabelText("Запомнить меня");

    expect(checkbox).not.toBeChecked();
    await userEvent.setup().click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
