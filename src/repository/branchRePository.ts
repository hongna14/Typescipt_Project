

import { executeQuery, getMany, getOne } from "../databaseConfig/client";
import { IBranch } from "../models/branchInterface";

class BranchRepository {
	getList() {
		const query = `SELECT * FROM coffee_shop;`
		return getMany(query)
	}

	getById(id: string) {
		const params = [id]
		const query = `SELECT *
        FROM coffee_shop
        WHERE coffee_shop_id = $1;`
		return getOne(query, params)
	}

	create(payload: IBranch) {
		const { coffeeShopAddress, coffeeShopPhoneNumber } = payload
		const params = [coffeeShopAddress, coffeeShopPhoneNumber]
		const query = `INSERT INTO coffee_shop (coffee_shop_address, coffee_shop_phone_number) VALUES
        ($1, $2);`;
		return executeQuery(query, params)
	}

	update(id: string, payload: IBranch, branchDetails: any) {
		const { coffeeShopName, coffeeShopAddress, coffeeShopPhoneNumber } = payload
		const { coffee_shop_name, coffee_shop_address, coffee_shop_phone_number } = branchDetails
		const params = [
			coffeeShopName || coffee_shop_name,
			coffeeShopAddress || coffee_shop_address,
			coffeeShopPhoneNumber || coffee_shop_phone_number,
			id,
		]
		const updateQuery = `
		UPDATE
			coffee_shop
    SET
		 	coffee_shop_name = $1,
    	coffee_shop_address= $2,
    	coffee_shop_phone_number = $3
    WHERE
			coffee_shop_id =  $4`;
		return executeQuery(updateQuery, params)
	}

	delete(id: string) {
		const params = [id]
		const query = `DELETE
        FROM coffee_shop 
        WHERE coffee_shop_id  =  $1;`
		return executeQuery(query, params)
	}
}

export default new BranchRepository();