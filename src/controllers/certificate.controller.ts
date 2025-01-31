import { Request, Response } from "express";
import { Certificate } from "../entity/certificate.entity";
import { AppDataSource } from "../config";
import { UserInfo } from "../entity/user.entity";

export const createcertificate = async (req: Request, res: Response) => {
  const { courseName } = req.body;
  const userRepo = AppDataSource.getRepository(UserInfo);
  const infouser = await userRepo.findOne({ where: { id: req.user?.id } });
  const iduser = infouser?.id;

  const certificate = new Certificate();
  certificate.courseName = courseName;
  certificate.user = infouser;
  const certificateRepo = AppDataSource.getRepository(Certificate);
  const responecertificate = await certificateRepo.save(certificate);

  return res
    .status(200)
    .json({
      id: responecertificate.id,
      user: responecertificate.user?.id,
      courseName: responecertificate.courseName,
      createAt: responecertificate.createdAt,
    });
};

// export const getcertificatebyuserid = async (req: Request, res: Response) => {
//     const {userId} = req.params;
//     console.log(userId);
//     // const { courseName } = req.body;
//     // const certificateRepo = AppDataSource.getRepository(Certificate);
//     // const getcertificatebyuserid = await certificateRepo.findOne({ where: { user?.id: userId } });
//     // const iduser = infouser?.id;
  
//     // const certificate = new Certificate();
//     // certificate.courseName = courseName;
//     // certificate.user = infouser;
//     // const certificateRepo = AppDataSource.getRepository(Certificate);
//     // const responecertificate = await certificateRepo.save(certificate);
  
//     // return res
//     //   .status(200)
//     //   .json({
//     //     id: responecertificate.id,
//     //     user: responecertificate.user?.id,
//     //     courseName: responecertificate.courseName,
//     //     createAt: responecertificate.createdAt,
//     //   });
//   };


  export const getcertificatebyid = async (req: Request, res: Response) => {
    const {id} = req.params;
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const certificaterespone = await certificateRepo.findOne({ where: { id: id } });
  
    return res
      .status(200)
      .json({
        id:certificaterespone?.id,
        user:certificaterespone?.user?.id,
        courseName:certificaterespone?.courseName,
        createAt: certificaterespone?.createdAt
      });
  };

  export const deletecertificatebyid = async (req: Request, res: Response) => {
    const {id} = req.params;
    const certificateRepo = AppDataSource.getRepository(Certificate);
    await certificateRepo.delete({ id: id });
  
    return res
      .status(200)
      .json({
         message: "Certificate deleted successfully"
      });
  };