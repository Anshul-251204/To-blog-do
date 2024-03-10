import { RegisterRequestBody } from "@/types/apiType";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(request: Request) {
	try {
		const body = await request.json();
        
		const { email, password }: RegisterRequestBody = body;

		if (!email || !password) {
			return NextResponse.json(
				{
					message: "All fields are required",
				},
				{ status: 400 }
			);
		}

		const user = await db.user.findUnique({
			where: { email },
		});

		const checkpassword = bcrypt.compareSync(password, user?.password!);

		if (checkpassword) {
			return NextResponse.json(user);
		}

		return null;
	} catch (error) {
		console.log(error);

		return null;
	}
}
