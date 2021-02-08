class ProductController {
    companion object {
        private fun blockUntilFinish(threads: MutableList<Thread>) {
            for (thread: Thread in threads) {
                try {
                    thread.join()
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
            threads.clear()
        }

        fun multiply(
            lMatrix: Array<Array<Double>>,
            rMatrix: Array<Array<Double>>,
            threadsAmount: Int = 6
        ): Array<Array<Double>> {
            val result = Array(lMatrix.size) { Array(rMatrix[0].size) { 0.0 } }
            val threads: MutableList<Thread> = mutableListOf()

            for (i in lMatrix.indices) {
                val thread = Thread(ProductThread(result, lMatrix, rMatrix, i))
                thread.start()
                threads.add(thread)
                if (threads.size == threadsAmount) blockUntilFinish(threads)
            }

            return result
        }
    }
}