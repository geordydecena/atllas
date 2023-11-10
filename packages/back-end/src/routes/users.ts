import { Router, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import { Op } from 'sequelize';
import { User } from '../services/db';
import IRoute from '../types/IRoute';
import { getErrorMessage } from '../utils/utils';
import { searchSchema, addSchema, updateSchema, deleteSchema } from './validators/userValidator';


const UsersRouter: IRoute = {
  route: '/users',
  router() {
    const router = Router();

    router.get('/', async (req: Request, res: Response) => { // not used
      try {
        const users = await User.findAll();
        return res.status(200).json({
          success: true,
          data: users,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
        });
      }
    });

    router.post('/search', searchSchema, async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new Error('Failed to validate request body');
        }
        const { search, field, asc } = matchedData(req, { locations: ['body'], includeOptionals: true });

        const whereClause = {
          [Op.or]: [
            {
              firstName: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              middleName: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        };

        const count = await User.count({
          where: whereClause
        });

        if (count === 0) {
          return res.json({
            success: true,
            data: {
              count,
              users: []
            }
          });
        }

        const users = await User.findAll({
          where: whereClause,
          order: [[field || 'id', (asc ? 'asc' : 'desc')]],
        });

        return res.json({
          success: true,
          data: {
            count,
            users
          }
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          success: false,
          message: getErrorMessage(e.errors?.[0] || e),
        });
      }
    });

    router.post('/add', addSchema, async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new Error('Failed to validate request body');
        }
        const data = matchedData(req, { locations: ['body'], includeOptionals: true });

        const user = await User.create(data);
        return res.status(200).json({
          success: true,
          data: user
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          success: false,
          message: getErrorMessage(e.errors?.[0] || e),
        });
      }
    });

    router.post('/delete', deleteSchema, async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new Error('Failed to validate request body');
        }
        const { id } = matchedData(req, { locations: ['body'], includeOptionals: true });

        const user = await User.destroy({
          where: { id },
        });

        if (!user) {
          throw new Error('Failed to find user to delete');
        }

        return res.json({
          success: true,
        });
      }
      catch (e) {
        console.log(e);
        res.status(400).json({
          success: false,
          message: getErrorMessage(e.errors?.[0] || e),
        });
      }
    });

    router.put('/update', updateSchema, async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new Error('Failed to validate request body.');
        }
        const data = matchedData(req, { locations: ['body'], includeOptionals: true });

        const user = await User.findByPk(data.id);
        if (!user) {
          throw new Error('Failed to find user to update');
        }

        Object.keys(data).forEach((key) => {
          const fieldKey: 'id' | 'registered' | 'firstName' | 'middleName' | 'lastName' | 'email' | 'phoneNumber' | 'address' | 'adminNotes' = key as 'id' | 'registered' | 'firstName' | 'middleName' | 'lastName' | 'email' | 'phoneNumber' | 'address' | 'adminNotes';
          user.setDataValue(fieldKey, data[key]);
        });

        await user.save();
        return res.status(200).json({
          success: true,
          data: user
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          success: false,
          message: getErrorMessage(e.errors?.[0] || e),
        });
      }
    });

    return router;
  },
};

export default UsersRouter;
