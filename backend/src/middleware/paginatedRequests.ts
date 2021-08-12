// import { Request, Response, NextFunction } from "express";
// const paginatedResults = (model) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const page = parseInt(<string>req.query.page)
//         const limit = parseInt(<string>req.query.limit)
//
//         const startIndex = (page - 1) * limit
//         const endIndex = page * limit
//
//         const results = {
//             next: {},
//             previous: {},
//             results: []
//         }
//
//         if (endIndex < await model.countDocuments().exec()) {
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             }
//         }
//
//         if (startIndex > 0) {
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             }
//         }
//         try {
//             results.results = await model.find().limit(limit).skip(startIndex).exec()
//             // @ts-ignore
//             res.paginatedResults = results
//             next()
//         } catch (e) {
//             res.status(500).json({ message: e.message })
//         }
//     }
// }