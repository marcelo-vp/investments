import express from 'express';
import PerformanceService from '../services/performance-service';

const router = express.Router();
const service = new PerformanceService();

router.post('/', async (req, res) => {
    try {
        const data = await service.getPerformanceHistory(req.body);
        res.status(200).send(data);
    } catch (e) {
        res.status(404).send({
            error_detail: `${e}`,
            message: 'Could not retrieve performance data',
        });
    }
});

export default router;
