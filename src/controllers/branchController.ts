
import branchRepository from "../repository/branchRePository";
import { Request, Response } from "express";
import { IBranch } from "../models/branchInterface";


class BranchController {

    // get Branch list
    async getBranchList(req: Request, res: Response) {
        const raw = await branchRepository.getList()

        const result = raw.map((item: any) => {
            return {
                coffeeShopId: item.coffee_shop_id,
                coffeeShopName: item.coffee_shop_name,
                coffeeShopAddress: item.coffee_shop_address,
                coffeeShopPhoneNumber: item.coffee_shop_phone_number
            };
        });
        res.send(result);
    }

    //get Branch details
    async getBranchDetails(req: Request, res: Response) {
        const id = req.params.id
        const raw = await branchRepository.getById(id);
        console.log(raw)
        if (!raw) {
            res.send("This branch is unvailable!!! 😫");
            return;
        }

        const result = {
            coffeeShopId: raw.coffee_shop_id,
            coffeeShopName: raw.coffee_shop_name,
            coffeeShopAddress: raw.coffee_shop_address,
            coffeeShopPhoneNumber: raw.coffee_shop_phone_number
        }

        res.send(result)
    }

    //Create Branch 
    async createBranch(req: Request, res: Response) {
        const payload = req.body;
        await branchRepository.create(payload)
        res.send("created 🤣");
    }

    //Update Branch 
    async updateBranch(req: Request, res: Response) {
        try {
            const coffeeShopId = req.params.id;
            const payload = req.body;
            const branchDetails = await branchRepository.getById(coffeeShopId)
            await branchRepository.update(coffeeShopId, payload, branchDetails)
            res.send("updated 🤣");
        } catch (e) {
            console.log("Error", e)
            res.send("error")
        }
    }
    //Delete Branch
    async deleteBranch(req: Request, res: Response) {
        const coffeeShopId = req.params.id;
        await branchRepository.delete(coffeeShopId)
        res.send("deleted 😍");
    }

}

export default new BranchController();