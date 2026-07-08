export const WHATSAPP = {
  left: "573005412940",
  right: "573158125673",
} as const;

export function waLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const LINKS = {
  repo: "https://github.com/DevCristobalvc/praktil",
  linkedinCristobal: "https://co.linkedin.com/in/cristobalvalenciaceron",
  linkedinJuan:
    "https://www.linkedin.com/in/juan-sebasti%C3%A1n-duque-5a7075195/",
} as const;
