export default class CLabel {
    private static instance: CLabel;

    /**
     * The CLabel's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the CLabel instance.
     *
     * This implementation let you subclass the CLabel class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): CLabel {
        if (!CLabel.instance) {
            CLabel.instance = new CLabel();
        }

        return CLabel.instance;
    }

    /**
     * Finally, any CLabel should define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
}
