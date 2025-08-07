export default interface ProfileField {
    label: string;
    value: string | number | undefined;
    name?: string;
    type?: string;
    options?: { label: string; value: string }[];
    className: string;
    style :object;
  }       