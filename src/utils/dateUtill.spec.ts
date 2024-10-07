import { formatTimeTo12Hour } from "./dateUtil";

describe("formatTimeTo12Hour", () => {
  it("should format time correctly for morning hours", () => {
    expect(formatTimeTo12Hour("2024-10-05T08:30:00")).toBe("8:30 AM");
    expect(formatTimeTo12Hour("2024-10-05T00:15:00")).toBe("12:15 AM");
  });

  it("should format time correctly for afternoon hours", () => {
    expect(formatTimeTo12Hour("2024-10-05T13:45:00")).toBe("1:45 PM");
    expect(formatTimeTo12Hour("2024-10-05T16:05:00")).toBe("4:05 PM");
  });

  it("should handle edge cases", () => {
    expect(formatTimeTo12Hour("2024-10-05T12:00:00")).toBe("12:00 PM");
    expect(formatTimeTo12Hour("2024-10-05T12:00:00")).toBe("12:00 PM");
    expect(formatTimeTo12Hour("2024-10-05T00:00:00")).toBe("12:00 AM");
  });
});
