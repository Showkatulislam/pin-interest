import Pin from "../models/pin.model.js";
export const getPins = async (req, res) => {
    try {
        const pageNumber = Number(req.query.cursor)
        const search = req.query.search || ''
        const userId = req.query.userId || ''
        const boardId = req.query.boardId || ''

        const LIMIT = 21
        const pins = await Pin.find(
            search
              ? {
                  $or: [
                    { title: { $regex: search, $options: "i" } },
                    { tags: { $in: [search] } },
                  ],
                }
              : userId
              ? { user: userId }
              : boardId
              ? { board: boardId }
              : {}
          )
            .limit(LIMIT)
            .skip(pageNumber * LIMIT);



        const hasNextPage = pins.length === LIMIT


        res.status(200).json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getPin=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id);
        const pin = await Pin.findById(id).populate(
            "user",
            "username displayName img"
          );
        
        res.status(200).json(pin)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const createPin=async(req,res)=>{
    const {
        title,
        description,
        link,
        board,
        tags,
        textOptions,
        canvasOptions
      } = req.body;
      const media = req.files.media;
      console.log(title,description,link,board,tags,media)

      if ((!title, !description, !media)) {
        return res.status(400).json({ message: "All fields are required!" });
      }
    
      const parsedTextOptions = JSON.parse(textOptions || "{}");
      const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");
}