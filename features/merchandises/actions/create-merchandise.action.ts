"use server";

import { redirect } from "next/navigation";

import { cloudinary } from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import {
  ACCEPTED_MERCHANDISE_IMAGE_TYPES,
  createMerchandiseSchema,
  MAX_MERCHANDISE_IMAGE_SIZE,
} from "../schemas/create-merchandise.schema";

type CreateMerchandiseActionResult = {
  success: boolean;
  message?: string;
};

async function uploadImageToCloudinary(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64File, {
    folder: "controle-mercadorias/mercadorias",
    resource_type: "image",
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: "limit",
        quality: "auto:eco",
        fetch_format: "auto",
      },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function createMerchandiseAction(
  formData: FormData,
): Promise<CreateMerchandiseActionResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "Usuário não autenticado.",
    };
  }

  const rawData = {
    code: String(formData.get("code") ?? ""),
    description: String(formData.get("description") ?? ""),
    recipientName: String(formData.get("recipientName") ?? ""),
    recipientPhone: String(formData.get("recipientPhone") ?? ""),
    deliveryAddress: String(formData.get("deliveryAddress") ?? ""),
    deliveryRegion: String(formData.get("deliveryRegion") ?? ""),
    status: String(formData.get("status") ?? "RECEIVED"),
    condition: String(formData.get("condition") ?? "NORMAL"),
    notes: String(formData.get("notes") ?? ""),
  };

  const parsedData = createMerchandiseSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Verifique os dados informados e tente novamente.",
    };
  }

  const image = formData.get("image");

  let uploadedImage: {
    url: string;
    publicId: string;
  } | null = null;

  if (image instanceof File && image.size > 0) {
    if (!ACCEPTED_MERCHANDISE_IMAGE_TYPES.includes(image.type)) {
      return {
        success: false,
        message: "A imagem deve estar no formato PNG, JPG ou WEBP.",
      };
    }

    if (image.size > MAX_MERCHANDISE_IMAGE_SIZE) {
      return {
        success: false,
        message: "A imagem deve ter no máximo 1MB.",
      };
    }

    uploadedImage = await uploadImageToCloudinary(image);
  }

  const merchandiseAlreadyExists = await prisma.merchandise.findUnique({
    where: {
      code: parsedData.data.code,
    },
    select: {
      id: true,
    },
  });

  if (merchandiseAlreadyExists) {
    return {
      success: false,
      message: "Já existe uma mercadoria cadastrada com este código.",
    };
  }

  await prisma.merchandise.create({
    data: {
      code: parsedData.data.code,
      description: parsedData.data.description,
      recipientName: parsedData.data.recipientName || null,
      recipientPhone: parsedData.data.recipientPhone || null,
      deliveryAddress: parsedData.data.deliveryAddress || null,
      deliveryRegion: parsedData.data.deliveryRegion || null,
      status: parsedData.data.status,
      condition: parsedData.data.condition,
      notes: parsedData.data.notes || null,
      deliveredAt: parsedData.data.status === "DELIVERED" ? new Date() : null,
      createdById: user.id,

      photos: uploadedImage
        ? {
            create: {
              url: uploadedImage.url,
              publicId: uploadedImage.publicId,
              type:
                parsedData.data.condition === "NORMAL"
                  ? "GENERAL"
                  : "DAMAGE_PROOF",
            },
          }
        : undefined,

      history: {
        create: {
          changedById: user.id,
          newStatus: parsedData.data.status,
          newCondition: parsedData.data.condition,
          note: "Mercadoria cadastrada no sistema.",
        },
      },
    },
  });

  redirect("/dashboard");
}
