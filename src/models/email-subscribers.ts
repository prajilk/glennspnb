import { Schema, model, models } from "mongoose";
import { EmailSubscribersDocument } from "./types/email-subscribers";

const EmailSubscribersSchema = new Schema<EmailSubscribersDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { versionKey: false }
);

const EmailSubscriber =
    models?.EmailSubscriber ||
    model<EmailSubscribersDocument>("EmailSubscriber", EmailSubscribersSchema);
export default EmailSubscriber;
