import {FilterQuery, LeanDocument, UpdateQuery} from "mongoose";
import config from "config";
import {get} from "lodash";
import {UserDocument} from "../model/user.model";
import Session, {SessionDocument} from "../model/session.model";
import {decode, sign} from "../utils/jwt.utils";
import {findUser} from "./user.service";

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
}

export function createAccessToken({user, session,}: {
    user: | Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>;
    session: | Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    // Build and return the new access token
    return sign(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} // 15 minutes
    );
}