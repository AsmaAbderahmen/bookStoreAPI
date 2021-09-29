const Author = require('../models/authorsModel');

function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

exports.checkExistance = async function (req, res, next) {
    let fullname = req.body.fullname;
    try {
        if (!fullname) {
            return res.status(400).json({ status: 400, message: 'lack of body informations' })
        } else {
            let data = await Author.findOne({ fullname: fullname });
            if (data) {
                return res.status(200).json({ status: 200, message: 'author already exists', data: { exist: true } })
            } else {
                return res.status(200).json({ status: 200, message: 'author do not exists', data: { exist: false } })
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};

exports.create = async function (req, res, next) {
    /*
    * body:{
    *      fullname: string
    *      biography: string
    *      image: file
    * }
    */

    let body = req.body;
    if (!body.fullname) {
        res.status(400).json({ status: 400, message: 'no fullname found in the body' });
    } else {
        if (req.file)
            body['image'] = req.file.filename;
        else
            body['image'] = 'author_default_image.png';

        try {
            const new_author = new Author(body);
            const author_data = await Author.create(new_author);
            if (author_data) {
                return res.status(201).json({
                    status: 201, message: 'new author ctreated',
                    data: {
                        _id: author_data._id,
                        fullname: author_data.fullname,
                        image: author_data.image,
                        biography: author_data.biography || ""
                    }
                });
            } else
                res.status(409).json({ status: 409, message: 'author is not created' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: 500, message: 'server error' })
        }
    }
};

/*
  List :get the list tof authors to choose from while adding a new book
*/
exports.list = async function (req, res, next) {
    let page = Number(req.params.page_number)
    let per_page = Number(req.params.per_page)

    try {
        const authors = await Author.find({}, 'fullname _id image')
            .sort({ updatedAt: -1 })
        let count = authors.length;

        return res.status(200).json({
            status: 200, message: 'list of authors', data: {
                total_count: count,
                current_page: Number(page),
                total_pages: Math.ceil(count / per_page),
                authors: paginate(authors, per_page, page).map((a) => {
                    return ({
                        _id: a._id,
                        fullname: a.fullname,
                        image: a.image
                    })
                })
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};