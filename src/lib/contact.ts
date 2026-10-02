export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "booking", label: "A booking I've already made" },
  { value: "group", label: "Large group or private event" },
  { value: "menu", label: "Menu, allergens or dietary needs" },
  { value: "feedback", label: "Feedback about a visit" },
  { value: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactFields, string>>;
  values?: Partial<ContactFields>;
};

export function topicLabel(value: string) {
  return contactTopics.find((t) => t.value === value)?.label ?? "General question";
}

export function validateContact(values: ContactFields) {
  const errors: NonNullable<ContactState["errors"]> = {};

  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (values.name.length > 80) errors.name = "That name looks a bit long.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 120) {
    errors.email = "Please enter a valid email address so we can reply.";
  }

  if (values.phone) {
    const digits = values.phone.replace(/[^\d+]/g, "");
    if (digits.length < 10 || digits.length > 16) {
      errors.phone = "That phone number doesn't look right. It's optional, so you can leave it blank.";
    }
  }

  if (!contactTopics.some((t) => t.value === values.topic)) {
    errors.topic = "Please choose what it's about.";
  }

  if (values.message.length < 10) errors.message = "Tell us a little more so we can help.";
  if (values.message.length > 2000) errors.message = "Please keep your message under 2,000 characters.";

  return errors;
}
