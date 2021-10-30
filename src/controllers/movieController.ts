import { Request, Response, NextFunction } from 'express'

import Movie from '../models/Movie'
import MovieService from '../services/movie'
import catchAsyncError from '../middlewares/catchAsyncErrors'

// POST /movies
export const createMovie = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, publishedYear, genres, duration, characters } = req.body
    const movie = new Movie({
      name,
      publishedYear,
      genres,
      duration,
      characters,
    })
    await MovieService.create(movie)
    res.json(movie)
  }
)

// PUT /movies/:movieId
export const updateMovie = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = req.body
    const movieId = req.params.movieId
    const updatedMovie = await MovieService.update(movieId, update)
    res.json(updatedMovie)
  }
)

// DELETE /movies/:movieId
export const deleteMovie = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    await MovieService.deleteMovie(req.params.movieId)
    res.status(204).end()
  }
)

// GET /movies/:movieId
export const findById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await MovieService.findById(req.params.movieId))
  }
)

// GET /movies
export const findAll = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await MovieService.findAll())
  }
)
